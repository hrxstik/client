import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  Calendar,
  CalendarSelected,
  CalendarReserved,
  CalendarDate,
} from '@demark-pro/react-booking-calendar';
import '@demark-pro/react-booking-calendar/dist/react-booking-calendar.css';
import axios from 'axios';
import PropertyTypeSelector from '../components/Booking/PropertyTypeSelector';
import PropertySelector from '../components/Booking/PropertySelector';
import TimeSelector from '../components/Booking/TimeSelector';
import PhoneInput from '../components/Booking/PhoneInput';
import BookingInfo from '../components/Booking/BookingInfo';
import { createBooking, fetchOccupiedDates } from '../redux/slices/bookingsSlice';
import { useAppDispatch } from '../redux/store';
import { validatePhone } from '../utils/validatePhone';
import { validateTime } from '../utils/validateTime';

const Booking: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [propertyType, setPropertyType] = useState('');
  const [properties, setProperties] = useState({});
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<CalendarSelected[]>([]);
  const [reservedDates, setReservedDates] = useState<CalendarReserved[]>([]);
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('11:00');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [showBookingInfo, setShowBookingInfo] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({
    propertyName: '',
    dates: { start: new Date(), end: new Date() },
    phone: '',
    startTime: '',
    endTime: '',
  });

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
    setSelectedProperty(null);
    setSelectedDates([]);
    setReservedDates([]);
    setError('');
  };

  const handlePropertySelect = (id: number) => {
    setSelectedProperty(id);
    setSelectedDates([]);
    setReservedDates([]);

    if (propertyType === 'sauna') {
      setStartTime('11:00');
      setEndTime('14:00');
    } else {
      setStartTime('14:00');
      setEndTime('11:00');
    }
  };

  const handleDateChange = (dates: CalendarSelected[]) => {
    setSelectedDates(dates);
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value);
    validateTime(event.target.value, endTime);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
    validateTime(startTime, event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    const { isValid, error } = validatePhone(value);
    setPhoneError(error);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedProperty || selectedDates.length === 0 || !phone) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    const dates = selectedDates.map((date) => {
      const d = new Date(date as CalendarDate);
      return new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
      );
    });

    let endDate = dates[dates.length - 1];

    if (propertyType === 'sauna') {
      const timeValidationResult = validateTime(startTime, endTime);
      if (!timeValidationResult.isValid) {
        setError(timeValidationResult.error);
        return;
      }

      endDate = new Date(dates[0]);

      if (timeValidationResult.nextDay) {
        endDate.setDate(endDate.getDate() + 1);
      }
    }

    try {
      const resultAction = await dispatch(
        createBooking({
          propertyId: selectedProperty,
          dates: {
            start: dates[0],
            end: endDate,
          },
          phone,
          startTime,
          endTime,
        }),
      );

      if (createBooking.fulfilled.match(resultAction)) {
        const bookingInfoData = {
          propertyName: properties[propertyType].find((prop) => prop.id === selectedProperty)?.name,
          dates: {
            start: dates[0],
            end: resultAction.payload.endDate,
          },
          phone,
          startTime,
          endTime,
        };

        setBookingInfo(bookingInfoData);
        setShowBookingInfo(true);

        dispatch(fetchOccupiedDates(selectedProperty)).then((action) => {
          if (fetchOccupiedDates.fulfilled.match(action)) {
            const reservedDatesArray: CalendarReserved[] = action.payload.map(
              (dateString: string) => ({
                startDate: new Date(dateString),
                endDate: new Date(dateString),
              }),
            );
            setReservedDates(reservedDatesArray);
          }
        });

        setSelectedDates([]);
        setPhone('');
        setError('');
      } else {
        setError(
          (resultAction.payload as any)?.message || 'Ошибка при бронировании. Попробуйте ещё раз.',
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (selectedProperty) {
      dispatch(fetchOccupiedDates(selectedProperty)).then((action) => {
        if (fetchOccupiedDates.fulfilled.match(action)) {
          const reservedDatesArray: CalendarReserved[] = action.payload.map(
            (dateString: string) => ({
              startDate: new Date(dateString),
              endDate: new Date(dateString),
            }),
          );
          setReservedDates(reservedDatesArray);
        }
      });
    }
  }, [selectedProperty]);

  useEffect(() => {
    const getProperties = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-properties`);
      setProperties(response.data);
    };

    getProperties();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Бронирование</h1>

      <form onSubmit={handleSubmit}>
        <PropertyTypeSelector propertyType={propertyType} onChange={handlePropertyChange} />

        <PropertySelector
          propertyType={propertyType}
          properties={properties[propertyType] || []}
          onSelect={handlePropertySelect}
        />

        {propertyType && selectedProperty && (
          <div className="mb-4">
            <label className="block">
              <span>Выберите дат{propertyType === 'sauna' ? 'у' : 'ы'}:</span>
            </label>
            <Calendar
              onChange={handleDateChange}
              reserved={reservedDates}
              range={propertyType !== 'sauna'}
              selected={selectedDates}
              protection={true}
            />
          </div>
        )}
        {propertyType === 'sauna' && selectedDates.length > 0 && (
          <TimeSelector
            startTime={startTime}
            endTime={endTime}
            timeError={timeError}
            onStartTimeChange={handleStartTimeChange}
            onEndTimeChange={handleEndTimeChange}
          />
        )}

        <PhoneInput phone={phone} phoneError={phoneError} onChange={handlePhoneChange} />

        {showBookingInfo && (
          <BookingInfo
            propertyName={bookingInfo.propertyName}
            dates={bookingInfo.dates}
            phone={bookingInfo.phone}
            startTime={bookingInfo.startTime}
            endTime={bookingInfo.endTime}
            onClose={() => setShowBookingInfo(false)}
          />
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {timeError && <p className="text-red-500 mb-4">{timeError}</p>}

        <button
          type="submit"
          className="w-full text-center 
          py-1 px-2 sm:py-1 sm:px-4 select-none 
          rounded-full bg-white text-yaring-blue border-yaring-blue border block md:py-2
          md:px-4 text-sm md:text-base lg:text-lg transition">
          Забронировать
        </button>
      </form>
    </div>
  );
};

export default Booking;
