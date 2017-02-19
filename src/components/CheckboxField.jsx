import React from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

class CheckboxField extends React.Component {
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

    render(){
        const {
            wrapperClassName,
            className,
            name,
            errors,
            error,
            value,
            label,
            placeholder,
            errorStyles = {}
        } = this.props;
        return (
            <div className={wrapperClassName}>
                <label>
                    <input
                        type="checkbox"
                        checked={!!value}
                        name={name}
                        onClick={this.toggleValue}
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

export default FieldConnect(CheckboxField);