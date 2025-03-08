import React from 'react';
import Button from './Button';
import { useLocation } from 'react-router';

const Greeting = () => {
  return (
    <div className="relative text-center bg-greeting bg-cover bg-centers aspect-[1/1] flex flex-col justify-center items-center p-4 rounded-md">
      <div className="absolute inset-0 bg-black opacity-20 rounded-md"></div>
      <div className="relative z-10">
        <h3 className="text-xs md:text-base text-white">База отдыха для всей семьи</h3>
        <h1 className="text-base md:text-3xl text-white">Отдохните душой и телом</h1>
      </div>
      <div className="relative z-10 flex gap-1 p-1 md:gap-2 md:p-2">
        <Button className="border-none white-button" text="Выбрать даты" linkTo="/booking" />
        <Button className="border-none white-button" text="Подробнее о домиках" linkTo="/pricing" />
      </div>
    </div>
  );
};

export default Greeting;
