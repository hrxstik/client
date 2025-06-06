import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBookings, deleteBooking } from '../../redux/slices/bookingsSlice';
import BookingFilter from './BookingFilter';

const BookingList = () => {
  const dispatch = useAppDispatch();
  const { bookings, status, error, selectedFilter } = useSelector(
    (state: RootState) => state.bookingsReducer,
  );

  const handleFilterChange = (type: string) => {
    dispatch(fetchBookings(type));
  };

  const handleDeleteBooking = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
      dispatch(deleteBooking(id));
    }
  };

  React.useEffect(() => {
    dispatch(fetchBookings(selectedFilter));
  }, [selectedFilter]);

  React.useEffect(() => {
    dispatch(fetchBookings(''));
  }, []);

  const propertyTypesMap = {
    sauna: 'Баня',
    triangular: 'А-фрейм',
    barn: 'Барн-дом',
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Список бронирований</h2>
      <BookingFilter onFilterChange={handleFilterChange} />
      {status === 'loading' ? (
        <p>Загрузка...</p>
      ) : status === 'failed' ? (
        <p className="text-red-500">Ошибка: {error}</p>
      ) : (
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
              <th className="py-2 px-4 border-b">Дата создания (МСК)</th>
              <th className="py-2 px-4 border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const createdAt = new Date(booking.created_at);
              createdAt.setHours(createdAt.getHours() + 3);

              return (
                <tr key={booking.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{booking.id}</td>
                  <td className="py-2 px-4 border-b">{booking.property_name}</td>
                  <td className="py-2 px-4 border-b">
                    {propertyTypesMap[booking.type_name] || booking.type_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.start_date).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.start_date).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}
                  </td>
                  <td className="py-2 px-4 border-b">{booking.start_time || '—'}</td>
                  <td className="py-2 px-4 border-b">{booking.end_time || '—'}</td>
                  <td className="py-2 px-4 border-b">
                    <a href={'tel:' + booking.phone}>{booking.phone}</a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.created_at).toLocaleString('ru-RU', {
                      timeZone: 'Europe/Moscow',
                    })}{' '}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="bg-red-500 text-white rounded px-4 mt-1 py-1">
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
