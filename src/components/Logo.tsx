import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
      <Link to="/" className="logo">
        <div className="w-10 h-10 bg-logo bg-cover bg-center inline-block"></div>
      </Link>
    </div>
  );
};

export default Logo;
