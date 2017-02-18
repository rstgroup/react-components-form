import React from 'react';
import FieldConnect from './FieldConnect';

const SelectField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    errors,
    error,
    options = [],
    value,
    label,
    placeholder
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <select
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
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