import React from 'react';
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="page">
        <hr />
        <Navigation />
        <div className="underline text-sm">
          <div>
            <Link to="living-rules">Правила проживания</Link>
          </div>
          {/* <div>
            <Link to="privacy-policy">Политика конфиденциальности</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
