import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

export const TextField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    type = 'text',
    errors,
    error,
    value = '',
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {}
}) => (
    <div className={classnames(wrapperClassName, errorStyles.fieldClassName)}>
        {label && <label>{label}</label>}
        <input
            type={type === String ? 'text' : type}
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

TextField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(TextField);