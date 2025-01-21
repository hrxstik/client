import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingList from '../components/Booking/BookingList';
import CreateBooking from '../components/Booking/CreateBooking';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="page">
      <h1>Администрирование</h1>
      <BookingList />
      {false && <CreateBooking />}
      <button onClick={handleLogout} className="white-button">
        Выйти
      </button>
    </div>
  );
};

export default Admin;
