import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { clearFilter, setFilter } from '../../redux/slices/bookingsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const BookingFilter = ({ onFilterChange }) => {
  const dispatch = useAppDispatch();
  const { selectedFilter } = useSelector((state: RootState) => state.bookingsReducer);

  const handleFilterChange = (type: string) => {
    dispatch(setFilter(type));
    onFilterChange(type);
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    onFilterChange('');
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleClearFilter}
        className={`rounded px-4 py-1 mr-2 ${
          selectedFilter === '' ? 'bg-yaring-blue text-white' : 'bg-white border border-gray-300'
        }`}>
        Без фильтров
      </button>
      <button
        onClick={() => handleFilterChange('triangular')}
        className={`rounded px-4 py-1 mr-2 ${
          selectedFilter === 'triangular'
            ? 'bg-yaring-blue text-white'
            : 'bg-white border border-gray-300'
        }`}>
        Только треугольные дома
      </button>
      <button
        onClick={() => handleFilterChange('sauna')}
        className={`rounded px-4 py-1 mr-2 ${
          selectedFilter === 'sauna'
            ? 'bg-yaring-blue text-white'
            : 'bg-white border border-gray-300'
        }`}>
        Только бани
      </button>
      <button
        onClick={() => handleFilterChange('barn')}
        className={`rounded px-4 py-1 ${
          selectedFilter === 'barn'
            ? 'bg-yaring-blue text-white'
            : 'bg-white border border-gray-300'
        }`}>
        Только барн дома
      </button>
    </div>
  );
};

export default BookingFilter;
