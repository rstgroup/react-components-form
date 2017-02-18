import React from 'react';

const ErrorField = ({
    errors = [],
    className,
    itemClassName
}) => (
    <div className={className}>
        {errors.map((error, key) => (
            <div className={itemClassName} key={key}>
                {error}
            </div>
        ))}
    </div>
);

export default ErrorField;