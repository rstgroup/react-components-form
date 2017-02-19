import React from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

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
    placeholder,
    errorStyles = {}
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
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

export default FieldConnect(SelectField);