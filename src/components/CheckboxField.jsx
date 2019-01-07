import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FieldConnect } from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

export class CheckboxField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.value,
            value: props.checkboxValue,
        };
        this.toggleValue = this.toggleValue.bind(this);
    }

    componentWillReceiveProps({ value, checkboxValue }) {
        this.setState({ checked: value, value: checkboxValue });
    }

    getValue(checked) {
        const { type } = this.props;
        const { value } = this.state;
        if (type === Boolean) return !!checked;
        return checked ? value : undefined;
    }

    toggleValue() {
        const { onChange } = this.props;
        const { checked } = this.state;
        onChange(this.getValue(!checked));
        this.setState({ checked: !checked });
    }

    render() {
        const {
            wrapperClassName,
            className,
            path,
            validationErrors,
            hasValidationError,
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
                <label htmlFor={path}>
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        name={path}
                        onChange={this.toggleValue}
                        placeholder={placeholder}
                        className={className}
                        id={path}
                        {...fieldAttributes}
                    />
                    {label}
                </label>
                {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
            </div>
        );
    }
}

CheckboxField.propTypes = {
    ...fieldDefaultPropTypes,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
        PropTypes.func,
    ]),
    value: PropTypes.bool,
    checkboxValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.shape({}),
    ]),
};

CheckboxField.defaultProps = {
    ...fieldDefaultProps,
    type: Boolean,
    value: false,
    checkboxValue: true,
};

export default FieldConnect(CheckboxField);
