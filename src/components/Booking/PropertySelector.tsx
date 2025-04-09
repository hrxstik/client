import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PropertySelectorProps {
  propertyType: string;
  properties: { id: number; name: string }[];
  onSelect: (id: number) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  propertyType,
  properties,
  onSelect,
}) => {
  if (!propertyType) {
    return null;
  }

  const typeLabels = {
    triangular: 'А-фрейм дома',
    barn: 'Барн-дома',
    sauna: 'Бани',
  };

  const propertyLabel = typeLabels[propertyType] || 'Недвижимость';

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">{propertyLabel}</h2>
      {properties.map((property) => (
        <div key={property.id} className="flex items-center mb-2">
          <input
            type="radio"
            id={`${propertyType}-${property.id}`}
            name="house"
            value={property.id}
            onChange={() => onSelect(property.id)}
            className="mr-2"
          />
          <label htmlFor={`${propertyType}-${property.id}`}>{property.name}</label>
        </div>
      ))}
    </div>
  );
};

export default PropertySelector;
