import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [triangularHouses, setTriangularHouses] = useState([1, 2, 3, 4, 5]);
  const [barnHouses, setBarnHouses] = useState([1, 2]);
  const [saunas, setSaunas] = useState([1, 2]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [dates, setDates] = useState<{ start: string; end: string } | null>(null);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedProperty || !dates || !phone) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await axios.post('/api/book', {
        propertyType,
        propertyId: selectedProperty,
        dates,
        phone,
      });

      if (response.status === 200) {
        alert('Бронирование успешно!');
      }
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
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertySelect = (id: number) => {
    setSelectedProperty(id);
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
                <input
                  type="date"
                  name="start"
                  onChange={handleDateChange}
                  required
                  className="block w-full border rounded-md p-2"
                />
                <input
                  type="date"
                  name="end"
                  onChange={handleDateChange}
                  required
                  className="block w-full border rounded-md p-2"
                />
              </div>
            </label>
          </div>
        )}

        <label className="block mb-4">
          <span>Номер телефона:</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

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
