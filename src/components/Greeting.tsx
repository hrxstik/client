import React from 'react';
import Button from './buttons/Button';

const Greeting = () => {
  return (
    <div className="bg-greeting bg-cover bg-centers aspect-[1/1] flex flex-col justify-center items-center p-4">
      <div>
        <h3 className="text-white">База отдыха для всей семьи</h3>
        <h1 className="font-medium text-white">Отдохните душой и телом</h1>
      </div>
      <div className="flex gap-2 p-2">
        <Button className="white-button" text="Выбрать даты" linkTo="/booking" />
        <Button className="white-button" text="Подробнее о домиках" linkTo="/pricing" />
      </div>
    </div>
  );
};

export default Greeting;
