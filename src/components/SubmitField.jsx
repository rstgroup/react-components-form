import React from 'react';
import FieldConnect from './FieldConnect';

const SubmitField = ({
    className,
    submit,
    value
}) => (
    <div className={className}>
        <button
            onClick={submit}
            className={className}
        >
            {value}
        </button>
    </div>
);

export default FieldConnect(SubmitField);