import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export class TextField extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target: { value } }) {
        const { trim, onChange } = this.props;

        onChange(trim && value ? value.trim() : value);
    }

    render() {
        const {
            wrapperClassName,
            className,
            name,
            type,
            validationErrors,
            hasValidationError,
            value,
            label,
            placeholder,
            errorStyles,
            fieldAttributes,
        } = this.props;

        const fieldWrapperClassName = classnames(
            wrapperClassName,
            hasValidationError && errorStyles.fieldClassName,
        );
        return (
            <div className={fieldWrapperClassName}>
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    type={type === String ? 'text' : type}
                    name={name}
                    onChange={this.handleChange}
                    value={value}
                    placeholder={placeholder}
                    className={className}
                    {...fieldAttributes}
                />
                {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
            </div>
        );
    }
}

TextField.propTypes = {
    ...fieldDefaultPropTypes,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.func,
        PropTypes.object,
        PropTypes.array,
    ]),
    trim: PropTypes.bool,
};

TextField.defaultProps = {
    ...fieldDefaultProps,
    type: 'text',
    trim: false,
};

export default FieldConnect(TextField);
