import FieldConnect from '../../FieldConnect';
import ErrorField from './Error.field.jsx';
import PropTypes from "prop-types";
import './text.field.css';

const InputField = ({
    name = '',
    type = 'text',
    validationErrors = [],
    hasValidationError = false,
    value = '',
    label = '',
    placeholder = '',
    fieldAttributes = {},
    trim = false,
    onChange
}) => {
    const handleChange = ({ target: { value } }) => {
        onChange(trim && value ? value.trim() : value);
    }

    return (
        <div id={name} className="fieldWrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type === String ? 'text' : type}
                name={name}
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                className="fieldInput"
                {...fieldAttributes}
            />
            {hasValidationError && <ErrorField errors={validationErrors} />}
        </div>
    )
}

InputField.propTypes = {
    callbacks: PropTypes.shape({
        onChange: PropTypes.func,
        onError: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    }),
    className: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string,
    }),
    fieldAttributes: PropTypes.shape({}),
    hasValidationError: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    validationErrors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({}),
    ]),
    value: PropTypes.string,
    type: PropTypes.any,
    trim: PropTypes.bool,
};

export const TextField = FieldConnect(InputField);
