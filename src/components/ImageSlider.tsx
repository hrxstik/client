import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchSliderImages } from '../redux/slices/imageSlice';
import { ReactComponent as ArrowBack } from '../assets/arrow_back_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as ArrowForward } from '../assets/arrow_forward_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';

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
          alt={`Image ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
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
          className="absolute w-10 h-10 left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 pl-3.5 shadow bg-opacity-50">
          <ArrowBack className="w-5 h-5" />
        </button>
      ) : (
        ''
      )}

      {images.length ? (
        <button
          onClick={nextImage}
          className="absolute w-10 h-10 right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 pl-2.5 shadow bg-opacity-50">
          <ArrowForward className="w-5 h-5" />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default ImageSlider;
