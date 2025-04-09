import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const PrevButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
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
);

export default PrevButton;
