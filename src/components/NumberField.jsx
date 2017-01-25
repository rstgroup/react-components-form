import React from 'react';
import FieldConnect from './FieldConnect';

const NumberField = ({
    className,
    onChange,
    name,
    errors,
    error,
    value,
    label
}) => (
    <div className={className}>
        {label && <label>{label}</label>}
        <input
            type="number"
            name={name}
            onChange={(e) => onChange(parseInt(e.target.value))}
            value={value}
        />
    </div>
);

export default FieldConnect(NumberField);