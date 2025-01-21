import React from 'react';
import HomeButton from '../components/Buttons/HomeButton';

const LivingRules: React.FC = () => {
  return (
    <div className="page">
      <HomeButton />
      <h1>Правила проживания</h1>
      <ul className="">
        <li>Заезд с 14:00</li>
        <li>Выезд до 11:00</li>
      </ul>
      <HomeButton />
    </div>
  );
};

export default LivingRules;
