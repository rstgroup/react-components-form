import React from 'react';
import FieldConnect from './FieldConnect';

const getDateString = (date = new Date()) => {
    const day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    if (month < 10) {
        if(month === 0) month += 1;
        month = `0${month}`;
    }
    return `${year}-${month}-${day}`;
};

const TextField = ({
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
            type='date'
            name={name}
            onChange={(e) => onChange(new Date(e.target.value))}
            value={getDateString(value)}
        />
    </div>
);

export default FieldConnect(TextField);