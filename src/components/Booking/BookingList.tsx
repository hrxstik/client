import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsErr, setBookingsErr] = useState<string>('');
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/getBookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        setBookingsErr(err.message);
      });
  }, []);

  return (
    <div>
      <h2>Список бронирований</h2>
      {bookingsErr === '' ? (
        <table>
          <thead>
            <tr>
              <th>Идентификатор</th>
              <th>Недвижимость</th>
              <th>Дата въезда</th>
              <th>Дата выезда</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.property_name}</td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>
                  <button>Редактировать</button>
                  <button>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        'Ошибка: ' + bookingsErr
      )}
    </div>
  );
};

export default BookingList;
