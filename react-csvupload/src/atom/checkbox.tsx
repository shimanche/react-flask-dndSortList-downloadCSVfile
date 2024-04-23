import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label>{label}</label>
    </div>
  );
};

