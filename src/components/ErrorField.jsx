import React, { PropTypes } from 'react';

export const ErrorField = ({
    errors = [],
    className,
    itemClassName,
    ErrorComponent
}) => (
    ErrorComponent &&
    <ErrorComponent
        className={className}
        itemClassName={itemClassName}
        errors={errors}
    />
    ||
    <div className={className}>
        {errors.map((error, key) => (
            <div className={itemClassName} key={key}>
                {error}
            </div>
        ))}
    </div>
);

ErrorField.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    ErrorComponent: PropTypes.func
};

export default ErrorField;