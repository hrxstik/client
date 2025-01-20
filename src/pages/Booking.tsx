import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [triangularHouses, setTriangularHouses] = useState([1, 2, 3, 4, 5]);
  const [barnHouses, setBarnHouses] = useState([1, 2]);
  const [saunas, setSaunas] = useState([1, 2]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [dates, setDates] = useState<{
    start: string;
    end: string;
    startTime?: string;
    endTime?: string;
  } | null>(null);
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [error, setError] = useState('');

  const alerts = {
    200: 'Бронирование успешно!',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedProperty || !dates || !phone) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/book', {
        propertyType,
        propertyId: selectedProperty,
        dates,
        phone,
      });

      alert(alerts[response.status]);
    } catch (err) {
      setError('Ошибка при бронировании. Попробуйте ещё раз.');
    }
  };

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
    setSelectedProperty(null);
    setDates(null);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDates((prev) => {
      const updatedDates = { ...prev!, [name]: value };

      if (updatedDates.start && updatedDates.end) {
        const startDate = new Date(updatedDates.start);
        const endDate = new Date(updatedDates.end);

        if (startDate > endDate) {
          setDateError('Дата въезда не может быть позже даты выезда');
        } else {
          setDateError('');
        }
      }

      return updatedDates;
    });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setDates((prev) => {
      const updatedDates = { ...prev!, [name]: value };

      if (updatedDates.start && updatedDates.end) {
        const startDate = new Date(updatedDates.start);
        const endDate = new Date(updatedDates.end);

        console.log(startDate);
        console.log(endDate);

        // Проверка на одинаковые даты
        if (startDate.getTime() === endDate.getTime()) {
          // Проверяем наличие значений времени
          if (updatedDates.startTime && updatedDates.endTime) {
            const startHour = parseInt(updatedDates.startTime.split(':')[0], 10);
            const endHour = parseInt(updatedDates.endTime.split(':')[0], 10);

            // Проверка времени
            if (startHour >= endHour) {
              setTimeError('Время начала бронирования должно быть меньше времени окончания');
            } else {
              setTimeError('');
            }
          }
        }
      }

      return updatedDates;
    });
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

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    validatePhone(value);
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
              <span>Выберите даты:</span>
              <div className="flex mt-1 space-x-2">
                <label htmlFor="start">Дата въезда</label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  onChange={handleDateChange}
                  required
                  className="block w-full border rounded-md p-2"
                />
                <label htmlFor="start">Дата выезда</label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  onChange={handleDateChange}
                  required
                  className="block w-full border rounded-md p-2"
                />
              </div>

              {propertyType === 'sauna' ? (
                <>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="startTime">Забронировать с</label>
                    <select
                      id="startTime"
                      name="startTime"
                      onChange={handleTimeChange}
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
                      onChange={handleTimeChange}
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
                </>
              ) : (
                <>
                  {dates && (
                    <div className="mt-4 p-4 bg-gray-100 border rounded-md text-center">
                      <p>
                        Время въезда: <span className="font-bold">11:00</span>
                      </p>
                      <p>
                        Время выезда: <span className="font-bold">14:00</span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </label>
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

        {dateError && <p className="text-red-500">{dateError}</p>}
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
