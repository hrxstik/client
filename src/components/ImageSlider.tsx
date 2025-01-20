import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchSliderImages } from '../redux/slices/imageSlice';

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { images, loading, error } = useSelector((state: RootState) => state.imageReducer);

  useEffect(() => {
    dispatch(fetchSliderImages());
  }, [dispatch]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center">
        <div className="text-red-500">Ошибка: {error}</div>
      </div>
    );

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <div className="relative w-full h-0 pb-[100%]">
        <img
          src={images[currentIndex]}
          alt={`Что то пошло не так😥`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
        <div className="absolute gap-2 bottom-4 flex justify-center w-full">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-4 bg-opacity-30 ${
                index === currentIndex ? 'bg-gray-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {images.length ? (
        <button
          onClick={prevImage}
          className="absolute w-10 h-10 left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 pl-3.5 shadow bg-opacity-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
      ) : (
        ''
      )}

      {images.length ? (
        <button
          onClick={nextImage}
          className="absolute w-10 h-10 right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 pl-2.5 shadow bg-opacity-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default ImageSlider;
