import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  return (
    <Link to="/" className="white-button">
      <span>На главную</span>
    </Link>
  );
};

export default HomeButton;
