import React from 'react';
import HomeButton from '../components/buttons/HomeButton';

const LivingRules: React.FC = () => {
  return (
    <div className="page">
      <HomeButton />
      <h1>Правила проживания</h1>
      <ul>
        <li>Заезд с 14:00</li>
        <li>Выезд до 11:00</li>
      </ul>
      <HomeButton />
    </div>
  );
};

export default LivingRules;
