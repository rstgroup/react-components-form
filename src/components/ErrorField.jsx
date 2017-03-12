import React, { PropTypes } from 'react';

export const ErrorField = ({
    errors = [],
    className,
    itemClassName,
    ErrorComponent
}) => {
    const errorsList = Array.isArray(errors) ? errors : [errors];
    return (
        ErrorComponent &&
        <ErrorComponent
            className={className}
            itemClassName={itemClassName}
            errors={errorsList}
        />
        ||
        <div className={className}>
            {errorsList.map(error => (
                <div className={itemClassName} key={error}>
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
        PropTypes.string
    ]),
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    ErrorComponent: PropTypes.func
};

export default ErrorField;