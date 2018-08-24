import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export class RadioField extends React.Component {
    renderOptionsList() {
        const {
            options,
            className,
            placeholder,
            fieldAttributes,
            value,
            path,
            onChange,
        } = this.props;
        return options.map((option, index) => {
            const uniqueName = `${path}-${index}`;
            const optionValue = option.label ? option.value : option;
            const onClick = () => {
                onChange(optionValue);
            };
            return (
                <label htmlFor={uniqueName} key={uniqueName}>
                    <input
                        type="radio"
                        name={path}
                        placeholder={placeholder}
                        className={className}
                        checked={value === optionValue}
                        value={optionValue}
                        htmlFor={uniqueName}
                        id={uniqueName}
                        onChange={onClick}
                        disabled={option.disabled}
                        {...fieldAttributes}
                    />
                    {option.label || option}
                </label>
            );
        });
    }

    render() {
        const {
            wrapperClassName,
            name,
            validationErrors,
            hasValidationError,
            label,
            errorStyles,
        } = this.props;

        const fieldWrapperClassName = classnames(
            wrapperClassName,
            hasValidationError && errorStyles.fieldClassName,
        );
        return (
            <div className={fieldWrapperClassName}>
                <label htmlFor={name}>{label}</label>
                {this.renderOptionsList()}
                {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
            </div>
        );
    }
}

RadioField.propTypes = {
    ...fieldDefaultPropTypes,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
        PropTypes.func,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
        PropTypes.func,
    ]),
};

RadioField.defaultProps = {
    ...fieldDefaultProps,
    value: '',
    options: [],
};

export default FieldConnect(RadioField);
