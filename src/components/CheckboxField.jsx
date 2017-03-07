import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

export class CheckboxField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.value || false,
            value: props.checkboxValue || true
        };
        this.toggleValue = this.toggleValue.bind(this);
    }

    toggleValue() {
        let value = !this.state.checked ? this.state.value : undefined;
        if (!value && this.props.type.name === 'Boolean') value = false;
        this.setState({
            checked: !this.state.checked
        });
        if (typeof this.props.onChange === 'function') this.props.onChange(value);
    }

    render() {
        const {
            wrapperClassName,
            className,
            name,
            errors,
            error,
            label,
            placeholder,
            errorStyles = {}
        } = this.props;
        return (
            <div className={wrapperClassName}>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        name={name}
                        onChange={this.toggleValue}
                        placeholder={placeholder}
                        className={className}
                    />
                    {label}
                </label>
                {error && <ErrorField errors={errors} {...errorStyles} />}
            </div>
        );
    }
}

CheckboxField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.any,
    checkboxValue: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    })
};

export default FieldConnect(CheckboxField);