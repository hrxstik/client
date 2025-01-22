import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsErr, setBookingsErr] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const fetchBookings = async (propertyType?: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/getBookings', {
        params: { propertyType },
      });
      setBookings(response.data);
      setBookingsErr('');
    } catch (err) {
      setBookingsErr(err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFilterChange = (type: string) => {
    setSelectedFilter(type);
    fetchBookings(type);
  };

  const handleClearFilter = () => {
    setSelectedFilter('');
    fetchBookings();
  };

  const handleDeleteBooking = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        fetchBookings(selectedFilter);
      } catch (err) {
        console.error(err);
        alert('Ошибка при удалении бронирования');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Список бронирований</h2>
      <div className="mb-4">
        <button
          onClick={handleClearFilter}
          className={`rounded px-4 py-1 mr-2 ${
            selectedFilter === '' ? 'bg-yaring-blue text-white' : 'bg-white border border-gray-300'
          }`}>
          Без фильтров
        </button>
        <button
          onClick={() => handleFilterChange('Треугольный дом')}
          className={`rounded px-4 py-1 mr-2 ${
            selectedFilter === 'Треугольный дом'
              ? 'bg-yaring-blue text-white'
              : 'bg-white border border-gray-300'
          }`}>
          Только треугольные дома
        </button>
        <button
          onClick={() => handleFilterChange('Баня')}
          className={`rounded px-4 py-1 mr-2 ${
            selectedFilter === 'Баня'
              ? 'bg-yaring-blue text-white'
              : 'bg-white border border-gray-300'
          }`}>
          Только бани
        </button>
        <button
          onClick={() => handleFilterChange('Барн дом')}
          className={`rounded px-4 py-1 ${
            selectedFilter === 'Барн дом'
              ? 'bg-yaring-blue text-white'
              : 'bg-white border border-gray-300'
          }`}>
          Только барн дома
        </button>
      </div>
      {bookingsErr === '' ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Идентификатор</th>
              <th className="py-2 px-4 border-b">Название недвижимости</th>
              <th className="py-2 px-4 border-b">Тип недвижимости</th>
              <th className="py-2 px-4 border-b">Дата въезда</th>
              <th className="py-2 px-4 border-b">Дата выезда</th>
              <th className="py-2 px-4 border-b">Время начала</th>
              <th className="py-2 px-4 border-b">Время окончания</th>
              <th className="py-2 px-4 border-b">Телефон</th>
              <th className="py-2 px-4 border-b">Дата создания</th>
              <th className="py-2 px-4 border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.property_name}</td>
                <td className="py-2 px-4 border-b">{booking.type_name}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.start_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.end_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{booking.start_time || '—'}</td>
                <td className="py-2 px-4 border-b">{booking.end_time || '—'}</td>
                <td className="py-2 px-4 border-b">{booking.phone}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.created_at).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {/* <button className="bg-yaring-blue text-white rounded px-4 py-1">
                    Редактировать
                  </button> */}
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="bg-red-500 text-white rounded px-4 mt-1 py-1">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">Ошибка: {bookingsErr}</p>
      )}
    </div>
  );
};

export default BookingList;
