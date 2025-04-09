import React from 'react';

interface SliderImageProps {
  src: string;
}

const SliderImage: React.FC<SliderImageProps> = ({ src }) => (
  <img
    src={src}
    alt={`Что то пошло не так😥`}
    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
  />
);

export default SliderImage;
