import React, { PropTypes } from 'react';
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
    errors,
    error,
    value = '',
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {}
}) => (
    <div className={classnames(wrapperClassName, error && errorStyles.fieldClassName)}>
        {label && <label>{label}</label>}
        <input
            type="number"
            name={name}
            onChange={(e) => onChange(parseByType(e.target.value, type))}
            value={value}
            step={type === 'float' ? 0.01 : 1}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
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
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.number,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(NumberField);