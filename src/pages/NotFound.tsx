import React from 'react';
import Button from '../components/Button';

const NotFound: React.FC = () => {
  return (
    <div>
      <div className="text-center w-full h-[512px] flex items-center flex-col justify-center gap-4">
        <h1>
          <span>😯</span>
          Что-то пошло не так...
        </h1>
        <p>Вы попали на несуществующую страницу!</p>
        <Button className="white-button" linkTo={'/'} text={'На главную'} />
      </div>
    </div>
  );
};

export default NotFound;
