import React from 'react';
import FieldConnect from './FieldConnect';

const TextareaField = ({
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
        <textarea
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
        />
    </div>
);

export default FieldConnect(TextareaField);