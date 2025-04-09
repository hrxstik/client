import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchSliderImages } from '../../redux/slices/imageSlice';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import Indicators from './Indicators';
import SliderImage from './SliderImage';

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
        {images.length > 0 && <SliderImage src={images[currentIndex]} />}
        <Indicators images={images} currentIndex={currentIndex} />
      </div>

      {images.length > 0 && <PrevButton onClick={prevImage} />}
      {images.length > 0 && <NextButton onClick={nextImage} />}
    </div>
  );
};

export default ImageSlider;
