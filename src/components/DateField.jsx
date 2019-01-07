import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FieldConnect } from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export const getDateString = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
};

export const DateField = ({
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
        <input
            type="date"
            name={name}
            onChange={e => onChange(new Date(e.target.value))}
            value={getDateString(value)}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
    </div>
);

DateField.propTypes = {
    ...fieldDefaultPropTypes,
    value: PropTypes.shape({}),
};

DateField.defaultProps = {
    ...fieldDefaultProps,
    value: new Date(),
};

export default FieldConnect(DateField);
