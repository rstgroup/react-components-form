import React from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';

export const SubmitField = ({
    wrapperClassName,
    className,
    submit,
    value,
    fieldAttributes,
}) => (
    <div className={wrapperClassName}>
        <button
            onClick={submit}
            className={className}
            {...fieldAttributes}
        >
            {value}
        </button>
    </div>
);

SubmitField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    submit: PropTypes.func.isRequired,
    value: PropTypes.string,
    fieldAttributes: PropTypes.shape({}),
};

SubmitField.defaultProps = {
    wrapperClassName: '',
    className: '',
    value: 'Submit',
    fieldAttributes: {},
};

export default FieldConnect(SubmitField);
