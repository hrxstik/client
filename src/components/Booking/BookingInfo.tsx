import React from 'react';

interface BookingInfoProps {
  propertyName: string;
  dates: { start: Date; end: Date };
  phone: string;
  startTime: string;
  endTime: string;
  onClose: () => void;
}

const BookingInfo: React.FC<BookingInfoProps> = ({
  propertyName,
  dates,
  phone,
  startTime,
  endTime,
  onClose,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
      <h2 className="text-lg font-bold mb-4">Бронирование создано:</h2>
      <p>
        Недвижимость: <strong>{propertyName}</strong>
      </p>
      <p>
        Даты: с{' '}
        <strong> {new Date(dates.start).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}</strong>{' '}
        по <strong>{new Date(dates.end).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}</strong>
      </p>
      <p>
        Время въезда: <strong>{startTime}</strong>
        <br />
        Время выезда: <strong>{endTime}</strong>
      </p>
      <p>
        Телефон: <strong>{phone}</strong>
      </p>
      <button type="button" className="white-button mt-2" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export default BookingInfo;
