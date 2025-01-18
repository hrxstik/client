import React from 'react';
import Navigation from './Navigation/Navigation';

const Header = () => {
  return (
    <div className="py-4">
      <div className="page">
        <Navigation />
      </div>
      <hr />
    </div>
  );
};

export default Header;
