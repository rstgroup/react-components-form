import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

const parseByType = (value, type) => {
    if (type === 'float') return parseFloat(value);
    return parseInt(value, 10);
};

export const NumberField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    type,
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
            type="number"
            name={name}
            onChange={e => onChange(parseByType(e.target.value, type))}
            value={value}
            step={type === 'float' ? 0.01 : 1}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
    </div>
);

NumberField.propTypes = {
    ...fieldDefaultPropTypes,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
        PropTypes.func,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.oneOf([NaN]),
    ]),
};

NumberField.defaultProps = {
    ...fieldDefaultProps,
    type: 'number',
    value: '',
};

export default FieldConnect(NumberField);
