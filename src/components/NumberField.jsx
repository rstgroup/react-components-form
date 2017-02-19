import React from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

const NumberField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    errors,
    error,
    value,
    label,
    placeholder,
    errorStyles = {}
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
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

export default FieldConnect(NumberField);