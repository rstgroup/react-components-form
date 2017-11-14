import PropTypes from 'prop-types';

export const fieldDefaultPropTypes = {
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
    wrapperClassName: PropTypes.string,
};
