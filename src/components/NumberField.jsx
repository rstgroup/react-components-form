import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

export const NumberField = ({
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

NumberField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.number,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    })
};

export default FieldConnect(NumberField);