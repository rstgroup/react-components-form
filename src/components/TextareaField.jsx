import React from 'react';
import FieldConnect from './FieldConnect';

const TextareaField = ({
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
        <textarea
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        />
    </div>
);

export default FieldConnect(TextareaField);