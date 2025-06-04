import React from 'react';
import { FaPhone } from 'react-icons/fa';

const Telephone = () => {
  const phoneNumber = '+7 (901) 066-11-11';
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <a
      href={`tel:${phoneNumber.replace(/([\s+()-])/g, '')}`}
      className={isMobile ? 'round-white-button' : 'white-button'}>
      {isMobile ? <FaPhone /> : phoneNumber}
    </a>
  );
};

export default Telephone;
