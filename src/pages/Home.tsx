import React, { useEffect } from 'react';
import Greeting from '../components/Greeting';
import About from '../components/About';
import HouseInfo from '../components/HouseInfo';
import { Questions } from '../components/Questions';
import { useLocation } from 'react-router';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="page">
      <Greeting />
      <About />
      <HouseInfo />
      <Questions />
    </div>
  );
};

export default Home;
