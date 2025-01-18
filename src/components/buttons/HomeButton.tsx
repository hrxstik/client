import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  return (
    <Link to="/" className="ml-auto white-button">
      <span>На главную</span>
    </Link>
  );
};

export default HomeButton;
