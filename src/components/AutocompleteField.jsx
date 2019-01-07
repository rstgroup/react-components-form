import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Autocomplete from 'react-autosuggest';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { FieldConnect } from './FieldConnect';
import ErrorField from './ErrorField';
import { fieldDefaultPropTypes } from '../constants/propTypes';
import { fieldDefaultProps } from '../constants/defaultProps';

const defaultSectionSuggestionsIndex = 'suggestions';

export class AutocompleteField extends Component {
    static shouldRenderSuggestions() {
        return true;
    }

    static suggestionsFilter(escapedValue, searchKey) {
        if (searchKey) {
            return option => !!get(option, searchKey, '').match(new RegExp(escapedValue, 'i'));
        }

        return option => option.match(escapedValue);
    }

    constructor(props) {
        super(props);

        this.state = {
            suggestions: this.getSuggestions(''),
        };
        this.onChange = this.onChange.bind(this);
        this.applySectionFilter = this.applySectionFilter.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    static onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    onSuggestionsFetchRequested({ value }) {
        const { getOptions, searchKey } = this.props;
        if (typeof getOptions === 'function') {
            getOptions(value, searchKey).then((suggestions) => {
                this.setState({ suggestions });
            });
            return;
        }
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: this.getSuggestions(''),
        });
    }

    onChange(e, { newValue }) {
        const { onChange } = this.props;
        onChange(newValue);
    }

    static getSectionSuggestions(section) {
        return section[defaultSectionSuggestionsIndex];
    }

    static getSuggestion(value) {
        return value;
    }

    getSuggestions(value) {
        const {
            options,
            multiSection,
            searchKey,
            alwaysRenderSuggestions,
            suggestionsShownIfFieldEmpty,
        } = this.props;
        const escapedValue = value.trim();
        if (escapedValue === '') {
            if (suggestionsShownIfFieldEmpty || alwaysRenderSuggestions) return options;
            return [];
        }
        if (multiSection) return this.applySectionFilter(options, escapedValue, searchKey);
        return options.filter(AutocompleteField.suggestionsFilter(escapedValue, searchKey));
    }

    applySectionFilter(sections, escapedValue, searchKey) {
        const { sectionSuggestionsIndex } = this.props;
        const copiedSections = cloneDeep(sections);
        const newSections = [];
        copiedSections.forEach((section) => {
            const clonedSection = Object.assign({}, section);
            const filteredSuggestions = AutocompleteField
                .getSectionSuggestions(clonedSection)
                .filter(
                    AutocompleteField.suggestionsFilter(escapedValue, searchKey),
                );
            if (filteredSuggestions.length) {
                clonedSection[sectionSuggestionsIndex] = filteredSuggestions;
                newSections.push(clonedSection);
            }
        });
        return newSections;
    }

    static renderInputComponent(inputProps) {
        return <input {...inputProps} />;
    }

    static renderSectionTitle(section) {
        return <div>{section.title}</div>;
    }

    static renderSuggestion(value) {
        return <div>{value}</div>;
    }

    render() {
        const {
            wrapperClassName,
            name,
            className,
            theme,
            validationErrors,
            hasValidationError,
            value,
            label,
            placeholder,
            errorStyles,
            fieldAttributes,
            renderInputComponent,
            renderItem,
            getValue,
            multiSection,
            renderSectionTitle,
            getSectionSuggestions,
            shouldRenderSuggestions,
            sectionSuggestionsIndex,
            onSuggestionSelected,
            alwaysRenderSuggestions,
        } = this.props;

        const fieldWrapperClassName = classnames(
            wrapperClassName,
            hasValidationError && errorStyles.fieldClassName,
        );
        return (
            <div className={fieldWrapperClassName}>
                {label && <label htmlFor={name}>{label}</label>}
                <Autocomplete
                    inputProps={{
                        className,
                        placeholder,
                        value,
                        name,
                        onChange: this.onChange,
                        onKeyDown: AutocompleteField.onKeyDown,
                        ...fieldAttributes,
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
                {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
            </div>
        );
    }
}
AutocompleteField.propTypes = {
    ...fieldDefaultPropTypes,
    value: PropTypes.string,
    renderItem: PropTypes.func,
    getValue: PropTypes.func,
    getOptions: PropTypes.func,
    searchKey: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
        PropTypes.number,
    ])),
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
    ...fieldDefaultProps,
    value: '',
    errorStyles: {},
    fieldAttributes: {},
    theme: {},
    options: [],
    renderInputComponent: AutocompleteField.renderInputComponent,
    renderItem: AutocompleteField.renderSuggestion,
    getValue: AutocompleteField.getSuggestion,
    renderSectionTitle: AutocompleteField.renderSectionTitle,
    getSectionSuggestions: AutocompleteField.getSectionSuggestions,
    shouldRenderSuggestions: AutocompleteField.shouldRenderSuggestions,
    sectionSuggestionsIndex: defaultSectionSuggestionsIndex,
    multiSection: false,
    onSuggestionSelected: null,
    suggestionsShownIfFieldEmpty: false,
};

export default FieldConnect(AutocompleteField);
