import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

export const SelectField = ({
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
    errorStyles = {},
    fieldAttributes = {}
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <select
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
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

SelectField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({})
    ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({})
    ])),
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(SelectField);