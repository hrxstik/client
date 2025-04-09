import React from 'react';

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  timeError: string;
  onStartTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEndTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startTime,
  endTime,
  timeError,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Выберите время:</h2>
      <div className="flex flex-col">
        <label htmlFor="startTime">Забронировать с</label>
        <select
          id="startTime"
          name="startTime"
          value={startTime}
          onChange={onStartTimeChange}
          required
          className="block w-full border rounded-md p-2">
          {[...Array(24)].map((_, hour) => (
            <option key={hour} value={`${String(hour).padStart(2, '0')}:00`}>
              {String(hour).padStart(2, '0')}:00
            </option>
          ))}
        </select>
        <label htmlFor="endTime" className="mt-4">
          Забронировать до
        </label>
        <select
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={onEndTimeChange}
          required
          className="block w-full border rounded-md p-2">
          {[...Array(24)].map((_, hour) => (
            <option key={hour} value={`${String(hour).padStart(2, '0')}:00`}>
              {String(hour).padStart(2, '0')}:00
            </option>
          ))}
        </select>
        {timeError && <div className="text-red-500 mt-2">{timeError}</div>}
      </div>
    </div>
  );
};

export default TimeSelector;
