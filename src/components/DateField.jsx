import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

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

export const DateField = ({
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
            type='date'
            name={name}
            onChange={(e) => onChange(new Date(e.target.value))}
            value={getDateString(value)}
            placeholder={placeholder}
            className={className}
        />
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

DateField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.shape({}),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    })
};

export default FieldConnect(DateField);