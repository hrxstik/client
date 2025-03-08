import React, { useEffect } from 'react';
import PricingInfo from '../components/PricingInfo';
import { CompleteHouseInfo } from '../components/CompleteHouseInfo';
// import HomeButton from '../components/Buttons/HomeButton';
import { useLocation } from 'react-router';

const Pricing: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="pricing page">
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2">
        <div className="relative w-full h-0 pb-[100%]">
          <img
            src="/pricing/aframe.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <PricingInfo
          header="Треугольный домик 45 кв.м"
          info="
        На нашей территории находится четыре Треугольных домика
        A-Frame 45 кв.м. Домики совершенно одинаковые и отличаются только названиями: «Дубок», «Березка», «Рябинка», «Елочка». Наши лесные шале подходят для поездки одному, вдвоем, семьей или небольшой компанией до 4-х человек."
          price="7000"
          time="сутки"
          checkIn="14.00"
          checkOut="11.00"
          button={true}
        />
      </div>
      <CompleteHouseInfo
        kitchenProps={[
          'Чайник',
          'Тостер',
          'Варочная панель',
          'Посуда и столовые приборы',
          'Сахар, соль, перец, кофе, чай',
          'Холодильник',
          'Посудомоечная машина',
          'Рожковая кофемашина',
        ]}
        livingroomProps={[
          'Проектор',
          'Раскладной диван',
          'Комод',
          'Настенная вешалка',
          'Обеденная зона',
        ]}
        bathRoomProps={['Душ', 'Фег', 'Жидкое мыло', 'Полотенца', 'Унитаз']}
        terraceProps={[
          'Гриль-очаг',
          'Дрова (вязанка дров предоставляется бесплатно, дополнительные дрова можно приобрести у нас или привезти с собой)',
          'Комфортные кресла',
        ]}
        bedroomProps={['Двухспальное место с комфортным матрасом']}
        additionalProps={['Бесплатный Wi-Fi', 'Теплый пол', 'Кондиционер']}
      />
      <hr />
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2">
        <div className="relative w-full h-0 pb-[100%]">
          <img
            src="/pricing/barn.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <PricingInfo
          header="Барн дом 36 кв.м"
          info=""
          price="7000"
          time="сутки"
          checkIn="14.00"
          checkOut="11.00"
          button={true}
        />
      </div>
      <CompleteHouseInfo
        kitchenProps={[
          'Чайник',
          'Тостер',
          'Варочная панель',
          'Посуда и столовые приборы',
          'Сахар, соль, перец, кофе, чай',
          'Холодильник',
          'Посудомоечная машина',
          'Рожковая кофемашина',
        ]}
        livingroomProps={[
          'Проектор',
          'Раскладной диван',
          'Комод',
          'Настенная вешалка',
          'Обеденная зона',
        ]}
        bathRoomProps={['Душ', 'Фег', 'Жидкое мыло', 'Полотенца', 'Унитаз']}
        terraceProps={[
          'Гриль-очаг',
          'Дрова (вязанка дров предоставляется бесплатно, дополнительные дрова можно приобрести у нас или привезти с собой)',
          'Комфортные кресла',
        ]}
        bedroomProps={['Двухспальное место с комфортным матрасом']}
        additionalProps={['Бесплатный Wi-Fi', 'Теплый пол', 'Кондиционер']}
      />
      <hr />
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="relative w-full h-0 pb-[100%]">
          <img
            src="/pricing/sauna.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <PricingInfo
          header="Баня"
          info="На территории находятся 2 бани.
      Банный комплекс можно арендовать без проживания на территории. Вместимость парной до 6 человек, вместимость комнаты отдыха до 12 человек.
      Минимальное время аренды — 2 часа. Топим баню к Вашему приезду — звоните заранее!"
          price="3500"
          time="час"
          checkIn=""
          checkOut=""
          button={true}
        />
      </div>
      {/* <HomeButton /> */}
    </div>
  );
};

export default Pricing;
