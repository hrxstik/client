import React from 'react';
import Button from './Buttons/Button';

interface Props {
  header: string;
  info: string;
  price: string;
  time: string;
  checkIn: string;
  checkOut: string;
  button: boolean;
}

const PricingInfo: React.FC<Props> = ({ header, info, price, time, checkIn, checkOut, button }) => {
  return (
    <div className="pl-4 flex flex-col gap-4">
      <h2>{header}</h2>
      <p>{info}</p>
      <p className="font-medium">
        Цена от {price} руб./{time}
      </p>
      {checkIn && checkOut && (
        <div className="gap-4 mt-5 flex flex-wrap">
          <span className="p-1 md:p-2 text-sm md:text-base border-yaring-blue border rounded-lg">
            Заезд с {checkIn}
          </span>
          <span className="p-1 md:p-2  text-sm md:text-base border-yaring-blue border rounded-lg">
            Выезд до {checkOut}
          </span>
        </div>
      )}
      {button && <Button className="white-button" text="Выбрать даты" linkTo="/booking" />}
    </div>
  );
};

export default PricingInfo;
