import React from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

export const SelectField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    validationErrors,
    hasValidationError,
    options = [],
    value = '',
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {},
}) => (
    <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
        {label && <label>{label}</label>}
        <select
            name={name}
            onChange={e => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        >
            {options.map(option => (
                <option
                    value={option.label ? option.value : option}
                    key={option.label || option}
                    disabled={option.disabled}
                >
                    {option.label || option}
                </option>
            ))}
        </select>
        {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
    </div>
);

SelectField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({}),
    ]),
    hasValidationError: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ])),
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string,
    }),
    fieldAttributes: PropTypes.shape({}),
};

export default FieldConnect(SelectField);
