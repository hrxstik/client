import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  linkTo: string;
  text: string;
}

const Button: React.FC<Props> = ({ className, linkTo, text }) => {
  return (
    <Link to={linkTo} className={className}>
      <span>{text}</span>
    </Link>
  );
};

export default Button;
