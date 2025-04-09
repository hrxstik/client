import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
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
);

export default NextButton;
