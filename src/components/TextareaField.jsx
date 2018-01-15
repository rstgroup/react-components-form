import React from 'react';
import classnames from 'classnames';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export const TextareaField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    validationErrors,
    hasValidationError,
    value,
    label,
    placeholder,
    errorStyles,
    fieldAttributes,
}) => (
    <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
            name={name}
            onChange={e => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
    </div>
);

TextareaField.propTypes = fieldDefaultPropTypes;

TextareaField.defaultProps = fieldDefaultProps;

export default FieldConnect(TextareaField);
