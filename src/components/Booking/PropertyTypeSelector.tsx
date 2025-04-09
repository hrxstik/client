import React from 'react';

interface PropertyTypeSelectorProps {
  propertyType: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({ propertyType, onChange }) => {
  return (
    <label className="block mb-4">
      <span>Выберите тип недвижимости:</span>
      <select
        value={propertyType}
        onChange={onChange}
        className="mt-1 block w-full border rounded-md p-2">
        <option value="">Выберите</option>
        <option value="triangular">А-фрейм дом</option>
        <option value="barn">Барн-дом</option>
        <option value="sauna">Баня</option>
      </select>
    </label>
  );
};

export default PropertyTypeSelector;
