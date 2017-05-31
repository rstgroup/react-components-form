import React, { PropTypes, Component } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { get } from '../helpers';
import classnames from 'classnames';
import Autocomplete from 'react-autosuggest';

export class AutocompleteField extends Component {
    static renderSuggestion(value) {
        return <div>{value}</div>
    }

    static getSuggestion(value) {
        return value
    }

    constructor(props) {
        super(props);

        this.state = {
            suggestions: this.getSuggestions('')
        };
        this.onChange = this.onChange.bind(this);
        this.suggestionsFilter = this.suggestionsFilter.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    suggestionsFilter(escapedValue, searchKey) {
        if (searchKey) {
            return option => !!get(option, searchKey ,'').match(escapedValue)
        }
        return option => option.match(escapedValue);
    }

    getSuggestions(value) {
        const { options, searchKey } = this.props;
        const escapedValue = value.trim();
        if (escapedValue === '') return [];
        return options.filter(this.suggestionsFilter(escapedValue, searchKey));
    }

    onSuggestionsFetchRequested = ({ value }) => {
        const { getOptions, searchKey } = this.props;
        if (typeof getOptions === 'function') {
            getOptions(value, searchKey).then((suggestions) => {
                this.setState({ suggestions });
            });
            return;
        }
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
            name,
            className,
            theme,
            errors,
            error,
            value,
            label,
            placeholder,
            errorStyles,
            fieldAttributes,
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
                        name,
                        onChange: this.onChange,
                        ...fieldAttributes
                    }}
                    suggestions={this.state.suggestions}
                    renderSuggestion={renderItem}
                    getSuggestionValue={getValue}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    theme={theme}
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
    getOptions: PropTypes.func,
    searchKey: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
        PropTypes.number
    ])),
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({})
};

AutocompleteField.defaultProps = {
    value: '',
    errorStyles: {},
    fieldAttributes: {},
    theme: {},
    options: []
};

export default FieldConnect(AutocompleteField);