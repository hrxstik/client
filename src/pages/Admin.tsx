import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <button onClick={handleLogout} className="white-button">
        Выйти
      </button>
    </div>
  );
};

export default Admin;
