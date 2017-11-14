import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export const SelectField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    validationErrors,
    hasValidationError,
    options,
    value,
    label,
    placeholder,
    errorStyles,
    fieldAttributes,
}) => (
    <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
        {label && <label htmlFor={name}>{label}</label>}
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
    ...fieldDefaultPropTypes,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ])),
};

SelectField.defaultProps = {
    ...fieldDefaultProps,
    options: [],
};

export default FieldConnect(SelectField);
