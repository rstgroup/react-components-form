import React from 'react';
import FieldConnect from './FieldConnect';

const TextField = ({
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
        {console.log('TextField', error)}
        <input
            type="text"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        />
    </div>
);

export default FieldConnect(TextField);