import React from 'react';

interface PhoneInputProps {
  phone: string;
  phoneError: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ phone, phoneError, onChange }) => {
  return (
    <label className="block mb-4">
      <span>Номер телефона:</span>
      <input
        type="tel"
        value={phone}
        onChange={onChange}
        required
        className="mt-1 block w-full border rounded-md p-2"
      />
      {phoneError && <p className="text-red-500">{phoneError}</p>}
    </label>
  );
};

export default PhoneInput;
