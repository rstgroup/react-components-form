import React from 'react';
import PropTypes from 'prop-types';

export const ErrorField = ({
    errors,
    className,
    itemClassName,
    ErrorComponent,
}) => {
    const errorsList = Array.isArray(errors) ? errors : [errors];
    if (ErrorComponent) {
        return (
            <ErrorComponent
                className={className}
                itemClassName={itemClassName}
                errors={errorsList}
            />
        );
    }
    return (
        <div className={className} data-testid="error-field">
            {errorsList.map(error => (
                <div className={itemClassName} key={error} role="listitem">
                    {error}
                </div>
            ))}
        </div>
    );
};

ErrorField.propTypes = {
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
    ]),
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    ErrorComponent: PropTypes.func,
};

ErrorField.defaultProps = {
    errors: [],
    className: '',
    itemClassName: '',
    ErrorComponent: undefined,
};

export default ErrorField;
