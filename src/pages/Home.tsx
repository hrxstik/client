import React from 'react';
import Greeting from '../components/Greeting';
import About from '../components/About';
import HouseInfo from '../components/HouseInfo';

const Home: React.FC = () => {
  return (
    <div className="page">
      <Greeting />
      <About />
      <HouseInfo />
    </div>
  );
};

export default Home;
