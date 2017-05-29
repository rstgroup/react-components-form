import React, { PropTypes, Component } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { get } from '../helpers';
import classnames from 'classnames';
import Autocomplete from 'react-autosuggest';

export class AutocompleteField extends Component {
    static renderSuggestion(value) {
        return <div >{value}</div>
    }

    static getSuggestion(value) {
        return value
    }

    constructor(props) {
        super(props);

        this.state = {
            suggestions: this.getSuggestions('')
        };
    }

    getSuggestions(value) {
        const { items, searchKey = '' } = this.props;
        const escapedValue = value.trim();
        if (escapedValue === '') return [];
        return items.filter(item => !!get(item, searchKey ,'').match(escapedValue));
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onChange(e, {newValue}) {
        const { onChange } = this.props;
        onChange(newValue)
    }

    render(){
        const {
            wrapperClassName,
            className,
            errors,
            error,
            value = '',
            label,
            placeholder,
            errorStyles = {},
            fieldAttributes = {},
            renderItem = AutocompleteField.renderSuggestion,
            getValue = AutocompleteField.getSuggestion
        } = this.props;
        return (
            <div className={classnames(wrapperClassName, error && errorStyles.fieldClassName)}>
                {label && <label>{label}</label>}
                <Autocomplete
                    inputProps={{
                        className,
                        placeholder,
                        value,
                        onChange: ::this.onChange,
                        ...fieldAttributes
                    }}
                    suggestions={this.state.suggestions}
                    renderSuggestion={renderItem}
                    getSuggestionValue={getValue}
                    onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={::this.onSuggestionsClearRequested}
                />
                {error && <ErrorField errors={errors} {...errorStyles} />}
            </div>
        );
    }
}
AutocompleteField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({})
    ]),
    error: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    renderItem: PropTypes.func,
    getValue: PropTypes.func,
    searchKey: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(AutocompleteField);