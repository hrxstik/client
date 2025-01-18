import React from 'react';
import { useScroll } from './Navigation/ScrollContext';
import Button from './buttons/Button';

const HouseInfo = () => {
  const { refs } = useScroll();
  return (
    <div
      ref={refs.houseInfo}
      className="bg-house bg-cover bg-centers aspect-[5/1] p-4 grid grid-cols-2"
      id="houseInfo">
      <section className="py-8 px-8">
        <h2 className="text-3xl font-bold mb-4">Домики</h2>
        <p className="mb-6">
          Ваш идеальный уголок уединения и комфорта на природе. Погрузитесь в атмосферу уюта и стиля
          в нашем уникальном доме. С его характерной архитектурой и современными удобствами, этот
          дом станет идеальным местом для отдыха от повседневной суеты.
        </p>
        <div className="flex gap-2">
          <Button className="white-button" text="Выбрать даты" linkTo="/booking" />
          <Button className="white-button" text="Подробнее о домиках" linkTo="/pricing" />
        </div>
      </section>
      <section className="py-8 px-16 text-xl">
        <ul className="list-disc list-inside mb-6 flex flex-col gap-4">
          <li>Современный ремонт</li>
          <li>Полностью оборудованная кухня</li>
          <li>Терраса для отдыха</li>
          <li>Проекторы в домах</li>
          <li>Кондиционер</li>
          <li>Зона для барбекю</li>
        </ul>
      </section>
    </div>
  );
};

export default HouseInfo;
