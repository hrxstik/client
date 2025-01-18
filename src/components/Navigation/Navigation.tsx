import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { ScrollElement, useScroll } from './ScrollContext';
import SocialLinks from '../SocialLinks';
import Telephone from '../buttons/TelephoneButton';
// import SocialLinks from '../SocialLinks';
// import Telephone from '../buttons/Telephone';

const Navigation = () => {
  const { scrollToElement } = useScroll();
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        scrollToElement(hash.slice(1) as ScrollElement);
        window.history.replaceState(null, '', location.pathname);
      }
    }
  }, [location]);

  return (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <Logo />
      <Link to="/#about">
        <span className="cursor-pointer">О нас</span>
      </Link>
      <Link to="/#houseInfo">
        <span className="cursor-pointer">Домики</span>
      </Link>
      <Link to="pricing">Цены</Link>
      <Link to="/#activities">Активности</Link>
      <Link to="/#questions">Частые вопросы</Link>
      <Link to="contact">Контакты</Link>
      <div className="flex items-center gap-4 ml-8">
        <SocialLinks />
        <Telephone />
      </div>
    </div>
  );
};

export default Navigation;
