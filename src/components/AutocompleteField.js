import React, { PropTypes, Component } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import { get, cloneArray } from '../helpers';
import classnames from 'classnames';
import Autocomplete from 'react-autosuggest';

const defaultSectionSuggestionsIndex = 'suggestions';

export class AutocompleteField extends Component {
    static renderSuggestion(value) {
        return <div>{value}</div>
    }

    static renderSectionTitle(section) {
        return <div>{section.title}</div>
    }

    static getSuggestion(value) {
        return value
    }

    static getSectionSuggestions(section) {
        return section[defaultSectionSuggestionsIndex];
    }

    constructor(props) {
        super(props);

        this.state = {
            suggestions: this.getSuggestions('')
        };
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.suggestionsFilter = this.suggestionsFilter.bind(this);
        this.applySectionFilter = this.applySectionFilter.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    renderInputComponent(inputProps) {
        return <input {...inputProps} />;
    }

    shouldRenderSuggestions() {
        return true;
    }

    suggestionsFilter(escapedValue, searchKey) {
        if (searchKey) {
            return option => !!get(option, searchKey ,'').match(new RegExp(escapedValue, "i"))
        }

        return option => option.match(escapedValue);
    }

    applySectionFilter(sections, escapedValue, searchKey) {
        const { sectionSuggestionsIndex = defaultSectionSuggestionsIndex } = this.props;
        const copiedSections = cloneArray(sections);
        const newSections = [];
        copiedSections.forEach((section) => {
            const filteredSuggestions = AutocompleteField.getSectionSuggestions(section).filter(
                this.suggestionsFilter(escapedValue, searchKey)
            );
            if (filteredSuggestions.length) {
                section[sectionSuggestionsIndex] = filteredSuggestions;
                newSections.push(section);
            }
        });
        return newSections;
    }

    getSuggestions(value) {
        const {
            options,
            multiSection,
            searchKey,
            alwaysRenderSuggestions,
            suggestionsShownIfFieldEmpty = false,
        } = this.props;
        const escapedValue = value.trim();
        if (escapedValue === ''){
            if (suggestionsShownIfFieldEmpty || alwaysRenderSuggestions) return options;
            return [];
        }
        if (multiSection) return this.applySectionFilter(options, escapedValue, searchKey);
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
            suggestions: this.getSuggestions('')
        });
    };

    onChange(e, {newValue}) {
        const { onChange } = this.props;
        onChange(newValue)
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
        }
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
            renderInputComponent = this.renderInputComponent,
            renderItem = AutocompleteField.renderSuggestion,
            getValue = AutocompleteField.getSuggestion,
            multiSection = false,
            renderSectionTitle = AutocompleteField.renderSectionTitle,
            getSectionSuggestions = AutocompleteField.getSectionSuggestions,
            shouldRenderSuggestions = this.shouldRenderSuggestions,
            sectionSuggestionsIndex = defaultSectionSuggestionsIndex,
            onSuggestionSelected = null,
            alwaysRenderSuggestions
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
                        onKeyDown: this.onKeyDown,
                        ...fieldAttributes
                    }}
                    renderInputComponent={renderInputComponent}
                    suggestions={this.state.suggestions}
                    renderSuggestion={renderItem}
                    getSuggestionValue={getValue}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    theme={theme}
                    multiSection={multiSection}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                    sectionSuggestionsIndex={sectionSuggestionsIndex}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                    alwaysRenderSuggestions={alwaysRenderSuggestions}
                    onSuggestionSelected={onSuggestionSelected}
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
    fieldAttributes: PropTypes.shape({}),
    renderInputComponent: PropTypes.func,
    multiSection: PropTypes.bool,
    renderSectionTitle: PropTypes.func,
    getSectionSuggestions: PropTypes.func,
    shouldRenderSuggestions: PropTypes.func,
    suggestionsShownIfFieldEmpty: PropTypes.bool,
    onSuggestionSelected: PropTypes.func,
    alwaysRenderSuggestions: PropTypes.bool,
};

AutocompleteField.defaultProps = {
    value: '',
    errorStyles: {},
    fieldAttributes: {},
    theme: {},
    options: []
};

export default FieldConnect(AutocompleteField);