import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  Calendar,
  CalendarDate,
  CalendarReserved,
  CalendarSelected,
} from '@demark-pro/react-booking-calendar';
import '@demark-pro/react-booking-calendar/dist/react-booking-calendar.css';
import axios from 'axios';

const Booking: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [propertyType, setPropertyType] = useState('');
  const [triangularHouses, setTriangularHouses] = useState([1, 2, 3, 4, 5]);
  const [barnHouses, setBarnHouses] = useState([1, 2]);
  const [saunas, setSaunas] = useState([1, 2]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<CalendarSelected[]>([]);
  const [reservedDates, setReservedDates] = useState<CalendarReserved[]>([]);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('14:00');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');
  const [timeError, setTimeError] = useState('');

  const alerts = {
    200: 'Бронирование успешно!',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedProperty || selectedDates.length === 0 || !phone) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    const dates = selectedDates.map((date) => new Date(date).toISOString());

    try {
      const response = await axios.post('http://localhost:5000/api/book', {
        propertyType,
        propertyId: selectedProperty,
        dates: {
          start: dates[0],
          end: dates[dates.length - 1],
        },
        phone,
        startTime,
        endTime,
      });

      alert(alerts[response.status]);
    } catch (err) {
      setError('Ошибка при бронировании. Попробуйте ещё раз.');
    }
  };

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
    setSelectedProperty(null);
    setSelectedDates([]);
  };

  const handlePropertySelect = (id: number) => {
    setSelectedProperty(id);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{11}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError('Номер телефона должен содержать 11 цифр');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  useEffect(() => {
    if (selectedProperty) {
      axios
        .get(`http://localhost:5000/api/occupied-dates/${selectedProperty}`)
        .then((response) => {
          const dates = response.data.map((d: { start_date: string; end_date: string }) => [
            new Date(d.start_date),
            new Date(d.end_date),
          ]);
          setReservedDates(dates.flat());
        })
        .catch((error) => console.error(error));
    }
  }, [selectedProperty]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    validatePhone(value);
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

  const validateTime = (start: string, end: string) => {
    const startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);

    let duration = endHour - startHour;

    if (duration < 0) {
      duration += 24;
    }

    if (duration < 2) {
      setTimeError('Минимальная продолжительность бронирования — 2 часа');
      return false;
    } else if (duration > 6) {
      setTimeError('Максимальная продолжительность бронирования — 6 часов');
      return false;
    } else {
      setTimeError('');
      return true;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Бронирование</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span>Выберите тип недвижимости:</span>
          <select
            value={propertyType}
            onChange={handlePropertyChange}
            className="mt-1 block w-full border rounded-md p-2">
            <option value="">Выберите</option>
            <option value="triangular">Треугольный дом</option>
            <option value="barn">Барн дом</option>
            <option value="sauna">Баня</option>
          </select>
        </label>

        {propertyType === 'triangular' && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Треугольные дома</h2>
            {triangularHouses.map((house) => (
              <div key={house} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`triangular-${house}`}
                  name="house"
                  value={house}
                  onChange={() => handlePropertySelect(house)}
                  className="mr-2"
                />
                <label htmlFor={`triangular-${house}`}>Дом {house}</label>
              </div>
            ))}
          </div>
        )}

        {propertyType === 'barn' && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Барн дома</h2>
            {barnHouses.map((house) => (
              <div key={house} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`barn-${house}`}
                  name="house"
                  value={house}
                  onChange={() => handlePropertySelect(house)}
                  className="mr-2"
                />
                <label htmlFor={`barn-${house}`}>Дом {house}</label>
              </div>
            ))}
          </div>
        )}

        {propertyType === 'sauna' && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Бани</h2>
            {saunas.map((sauna) => (
              <div key={sauna} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`sauna-${sauna}`}
                  name="sauna"
                  value={sauna}
                  onChange={() => handlePropertySelect(sauna)}
                  className="mr-2"
                />
                <label htmlFor={`sauna-${sauna}`}>Баня {sauna}</label>
              </div>
            ))}
          </div>
        )}

        {selectedProperty && (
          <div className="mb-4">
            <label className="block">
              <span>Выберите дат{propertyType === 'sauna' ? 'у' : 'ы'}:</span>
              <Calendar
                onChange={handleDateChange}
                reserved={reservedDates}
                range={propertyType !== 'sauna'}
                selected={selectedDates}
                protection={true}
              />
            </label>
          </div>
        )}

        {propertyType === 'sauna' && selectedDates.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Выберите время:</h2>
            <div className="flex flex-col">
              <label htmlFor="startTime">Забронировать с</label>
              <select
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                required
                className="block w-full border rounded-md p-2">
                {[...Array(24)].map((_, hour) => (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                ))}
              </select>

              <label htmlFor="endTime" className="mt-4">
                Забронировать до
              </label>
              <select
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                required
                className="block w-full border rounded-md p-2">
                {[...Array(24)].map((_, hour) => (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                ))}
              </select>
              {timeError && <div className="text-red-500 mt-2">{timeError}</div>}
            </div>
          </div>
        )}

        <label className="block mb-4">
          <span>Номер телефона:</span>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        {phoneError && <p className="text-red-500">{phoneError}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

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
