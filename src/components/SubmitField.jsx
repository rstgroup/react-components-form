import React from 'react';
import FieldConnect from './FieldConnect';

const SubmitField = ({
    wrapperClassName,
    className,
    submit,
    value
}) => (
    <div className={wrapperClassName}>
        <button
            onClick={submit}
            className={className}
        >
            {value}
        </button>
    </div>
);

export default FieldConnect(SubmitField);