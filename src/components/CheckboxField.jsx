import React from 'react';
import FieldConnect from './FieldConnect';

const CheckboxField = ({
    className,
    onChange,
    name,
    type = 'text',
    errors,
    error,
    value,
    label
}) => (
    <div className={className}>
        {label && <label>{label}</label>}
        <input
            type="checkbox"
            checked={value}
            name={name}
            onChange={(e) => onChange(!e.target.value)}
            value={value ? 'true' : false}
        />
    </div>
);

export default FieldConnect(CheckboxField);