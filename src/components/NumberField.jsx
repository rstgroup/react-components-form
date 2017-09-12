import React from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

const parseByType = (value, type) => {
    if (type === 'float') return parseFloat(value);
    return parseInt(value);
};

export const NumberField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    type,
    validationErrors,
    hasValidationError,
    value = '',
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {},
}) => (
    <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
        {label && <label>{label}</label>}
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
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
        PropTypes.func,
    ]),
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
    value: PropTypes.number,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string,
    }),
    fieldAttributes: PropTypes.shape({}),
};

export default FieldConnect(NumberField);
