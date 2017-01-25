import React from 'react';
import FieldConnect from './FieldConnect';

const SelectField = ({
    className,
    onChange,
    name,
    errors,
    error,
    options = [],
    value,
    label
}) => (
    <div className={className}>
        {label && <label>{label}</label>}
        <select
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        >
            {options.map(option => (
                <option
                    value={option.value || option}
                    key={option.value || option}
                >
                    {option.label || option}
                </option>
            ))}
        </select>
    </div>
);

export default FieldConnect(SelectField);