import React from 'react';

interface IndicatorsProps {
  images: string[];
  currentIndex: number;
}

const Indicators: React.FC<IndicatorsProps> = ({ images, currentIndex }) => (
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
);

export default Indicators;
