import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import FormContext from "./FormContext.js";

export const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.listeners = [];
            this.fieldValue = null;
            this.shouldShowValidationErrors = false;
            this.fieldValidationErrors = null;
            this.fieldValidators = [];

            this.setFieldValidator = this.setFieldValidator.bind(this);
            this.removeFieldValidator = this.removeFieldValidator.bind(this);
            this.registerFieldValidators = this.registerFieldValidators.bind(this);
            this.unregisterFieldValidators = this.unregisterFieldValidators.bind(this);
            this.onChangeData = this.onChangeData.bind(this);
            this.getPath = this.getPath.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
            this.getEventsEmitter = this.getEventsEmitter.bind(this);
            this.getValidationErrors = this.getValidationErrors.bind(this);
            this.getFieldAttributes = this.getFieldAttributes.bind(this);
            this.hasValidationError = this.hasValidationError.bind(this);
            this.submit = this.submit.bind(this);
        }

        getProviderContext() {
            return {
                ...this.context,
                getSchema: this.context.getSchema,
                getPath: this.getPath,
                setFieldValidator: this.setFieldValidator,
                removeFieldValidator: this.removeFieldValidator,
            };
        }

        UNSAFE_componentWillMount() {
            this.updateModelWithValueOrOptions();
            this.registerListeners();
            this.registerFieldValidators();
        }

        shouldComponentUpdate(nextProps) {
            const newProps = Object.assign({}, nextProps);
            const oldProps = Object.assign({}, this.props);
            const { name } = this.props;
            const { getModel, getValidationErrors } = this.context;
            return (
                !isEqual(getModel(name), this.fieldValue) ||
                !isEqual(getValidationErrors(name), this.fieldValidationErrors) ||
                !isEqual(newProps, oldProps) ||
                !isEqual(this.shouldShowErrors(), this.shouldShowValidationErrors)
            );
        }

        componentWillUnmount() {
            this.unregisterListeners();
            this.unregisterFieldValidators();
        }

        onChangeData(value) {
            const { name, callbacks: { onChange } = {} } = this.props;
            const {
                setModel,
                eventsEmitter,
                markFieldAsTouched,
                validateOnChange,
                isFormSubmitted,
            } = this.context;
            if (typeof setModel === 'function') {
                setModel(name, value, () => {
                    const fieldPath = this.getPath();
                    if (eventsEmitter) {
                        eventsEmitter.emit('modelChange', {
                            name: fieldPath,
                            value,
                        });
                    }
                    if (validateOnChange && !isFormSubmitted) markFieldAsTouched(fieldPath);
                    if (typeof onChange === 'function') onChange(value);
                });
            }
        }

        getModelPath() {
            const seperatedPath = this.getPath().split('.');
            return seperatedPath.splice(1, seperatedPath.length)
                .map((path) => {
                    const pathAttributes = path.split('-');
                    if (pathAttributes.length > 1) {
                        return pathAttributes[1];
                    }
                    return path;
                })
                .join('.');
        }

        setFieldValidator(validator) {
            const modelPath = this.getModelPath();
            this.context.setValidator(modelPath, validator);
            this.fieldValidators.push(validator);
        }

        setCurrentFieldValue(value) {
            this.fieldValue = cloneDeep(value);
        }

        getValue() {
            const { name, value } = this.props;
            const { getModel } = this.context;

            if (typeof getModel !== 'function') return value;

            const valueFromModel = getModel(name);
            const fieldValue = valueFromModel !== undefined
                ? valueFromModel
                : value;
            this.setCurrentFieldValue(fieldValue);
            return fieldValue;
        }

        getPropsFromSchema() {
            const { name } = this.props;
            const { getSchema } = this.context;
            if (typeof getSchema !== 'function') return undefined;
            return getSchema(name);
        }

        getEventsEmitter() {
            return this.context.eventsEmitter;
        }

        getValidationErrors() {
            const { name, callbacks: { onError } = {} } = this.props;
            const { getValidationErrors } = this.context;
            this.shouldShowValidationErrors = this.shouldShowErrors();
            let results = [];
            if (!this.shouldShowValidationErrors) return results;
            if (typeof getValidationErrors === 'function') results = getValidationErrors(name);
            this.fieldValidationErrors = results;
            if (typeof onError === 'function' && Object.keys(results).length > 0) onError(results);
            return results;
        }

        getPath() {
            const { name } = this.props;
            const { getPath } = this.context;
            if (typeof getPath !== 'function') return name;
            return `${getPath()}.${name}`;
        }

        getFieldAttributes() {
            const { validateOnChange, isFormSubmitted } = this.context;
            const { fieldAttributes = {}, callbacks: { onFocus, onBlur } = {} } = this.props;
            return Object.assign(
                {},
                {
                    onFocus,
                    onBlur: (element) => {
                        if (typeof onBlur === 'function') onBlur(element);
                        if (validateOnChange && !isFormSubmitted) {
                            this.onChangeData(this.getValue());
                        }
                    },
                },
                fieldAttributes,
            );
        }

        setValueFromOptions() {
            const { name, options, defaultOption } = this.props;
            const { setModel } = this.context;

            if (Array.isArray(options) && options.length && defaultOption !== undefined) {
                const value = options[defaultOption].label ?
                    options[defaultOption].value :
                    options[defaultOption];

                setModel(name, value);
            }
        }

        removeFieldValidator(validator) {
            const index = this.fieldValidators.indexOf(validator);
            if (index > -1) {
                this.context.removeValidator(validator);
                this.fieldValidators.splice(index, 1);
            }
        }

        registerFieldValidators() {
            if (this.props.validator) {
                const { getModel } = this.context;
                const fieldValidator = (...attr) => {
                    const value = typeof getModel === 'function' ? getModel(this.props.name) : '';
                    return this.props.validator(value, ...attr);
                };
                this.setFieldValidator(fieldValidator);
            }
        }

        unregisterFieldValidators() {
            this.fieldValidators.forEach((validator) => {
                this.context.removeValidator(validator);
            });
        }

        shouldShowErrors() {
            const { hasBeenTouched, validateOnChange, isFormSubmitted } = this.context;
            if (!validateOnChange || isFormSubmitted) {
                this.shouldShowValidationErrors = true;
                return true;
            }
            this.shouldShowValidationErrors = false;
            return hasBeenTouched(this.getPath());
        }

        submit(event) {
            const { submitForm } = this.context;
            if (typeof submitForm !== 'function') return;
            submitForm(event);
        }

        updateModelWithValueOrOptions() {
            const { name, value } = this.props;
            const { setModel } = this.context;

            if (!name || typeof setModel !== 'function') {
                return;
            }

            if (value) {
                setModel(name, value);
            } else {
                this.setValueFromOptions();
            }
        }

        registerListeners() {
            const { onModelChange, onEmitEvents } = this.props;
            const { eventsEmitter } = this.context;
            if (eventsEmitter) {
                if (typeof onModelChange === 'function') {
                    this.onModelChangeMethod = data => onModelChange(data, this);
                    eventsEmitter.listen('modelChange', this.onModelChangeMethod);
                }
                if (onEmitEvents) {
                    if (Array.isArray(onEmitEvents)) {
                        onEmitEvents.forEach(({ name, method }) => {
                            const listener = {
                                name,
                                method: data => method(data, this),
                            };
                            this.listeners.push(listener);
                            eventsEmitter.listen(name, listener.method);
                        });
                        return;
                    }
                    const { name, method } = onEmitEvents;
                    const listener = {
                        name,
                        method: data => method(data, this),
                    };
                    this.listeners.push(listener);
                    eventsEmitter.listen(name, listener.method);
                }
            }
        }

        unregisterListeners() {
            const { onEmitEvents } = this.props;
            const { eventsEmitter } = this.context;
            if (eventsEmitter) {
                if (typeof this.onModelChangeMethod === 'function') {
                    eventsEmitter.unlisten('modelChange', this.onModelChangeMethod);
                }
                if (onEmitEvents && this.listeners.length > 0) {
                    this.listeners.forEach(({ name, method }) => {
                        eventsEmitter.unlisten(name, method);
                    });
                }
            }
        }

        hasValidationError() {
            return !isEmpty(this.getValidationErrors());
        }

        render() {
            return (
                <FormContext.Provider value={this.getProviderContext()}>
                <Component
                {...this.getPropsFromSchema()}
                {...this.props}
                onChange={this.onChangeData}
                submit={this.submit}
                validationErrors={this.getValidationErrors()}
                hasValidationError={this.hasValidationError()}
                value={this.getValue()}
                eventsEmitter={this.getEventsEmitter()}
                path={this.getPath()}
                fieldAttributes={this.getFieldAttributes()}
            />
                </FormContext.Provider>);
        }
    }

    FieldConnector.contextType = FormContext;

    FieldConnector.propTypes = {
        /* eslint-disable */
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array,
            PropTypes.object,
        ]),
        /* eslint-enable */
        fieldAttributes: PropTypes.shape({}),
        /* eslint-disable */
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ])),
        defaultOption: PropTypes.number,
        onModelChange: PropTypes.func,
        onEmitEvents: PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                method: PropTypes.func,
            }),
            PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                method: PropTypes.func,
            })),
        ]),
        /* eslint-enable */
        callbacks: PropTypes.shape({
            onChange: PropTypes.func,
            onError: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func,
        }),
        validator: PropTypes.func,
    };

    return FieldConnector;
};

export default FieldConnect;
