import React from 'react';

const Telephone = () => {
  const phoneNumber = '+7 (977) 576-76-09';

  return (
    <a href={`tel:${phoneNumber.replace(/([\s+()-])/g, '')}`} className="orange-button">
      {phoneNumber}
    </a>
  );
};

export default Telephone;
