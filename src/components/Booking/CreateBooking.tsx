import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking: React.FC = () => {
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/book', {
        property_id: propertyId,
        start_date: startDate,
        end_date: endDate,
      });
      alert('Бронирование создано!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Создать бронирование</h2>
      <form onSubmit={handleSubmit}>
        <label>Недвижимость:</label>
        <select value={propertyId} onChange={(event) => setPropertyId(event.target.value)}>
          <option value="">Выберите недвижимость</option>
        </select>
        <br />
        <label>Дата въезда:</label>
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <br />
        <label>Дата выезда:</label>
        <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        <br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateBooking;
