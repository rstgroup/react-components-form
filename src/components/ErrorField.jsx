import React, { PropTypes } from 'react';

const ErrorField = ({
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
    ErrorComponent: PropTypes.node
};

export default ErrorField;