import React from 'react';
import FieldConnect from './FieldConnect';

const TextField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    type = 'text',
    errors,
    error,
    value,
    label,
    placeholder
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <input
            type={type}
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
        />
    </div>
);

export default FieldConnect(TextField);