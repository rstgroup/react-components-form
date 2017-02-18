import React from 'react';
import FieldConnect from './FieldConnect';

const NumberField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    errors,
    error,
    value,
    label,
    placeholder
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <input
            type="number"
            name={name}
            onChange={(e) => onChange(parseInt(e.target.value))}
            value={value}
            placeholder={placeholder}
            className={className}
        />
    </div>
);

export default FieldConnect(NumberField);