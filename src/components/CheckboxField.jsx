import React from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

export class CheckboxField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.value || false,
            value: props.checkboxValue || true
        };
    }

    componentWillReceiveProps({ value, checkboxValue }) {
        this.setState({ checked: value, value: checkboxValue });
    }

    getValue(checked) {
        const { type } = this.props;
        const { value } = this.state;
        if (type === Boolean) return checked ? true : false;
        return checked ? value : undefined;
    }

    toggleValue() {
        const { onChange } = this.props;
        const { checked } = this.state;
        onChange(this.getValue(!checked));
        this.setState({
            checked: !checked
        });
    }

    render() {
        const {
            wrapperClassName,
            className,
            name,
            validationErrors,
            hasValidationError,
            label,
            placeholder,
            errorStyles = {},
            fieldAttributes = {}
        } = this.props;
        return (
            <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        name={name}
                        onChange={::this.toggleValue}
                        placeholder={placeholder}
                        className={className}
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
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({})
    ]),
    hasValidationError: PropTypes.bool,
    value: PropTypes.any,
    checkboxValue: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

CheckboxField.defaultProps = {
    type: Boolean
};

export default FieldConnect(CheckboxField);