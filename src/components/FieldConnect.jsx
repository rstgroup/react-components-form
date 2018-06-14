import React from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { cloneArray, cloneObject } from '../helpers';

export const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.listeners = [];
            this.fieldValue = null;
            this.fieldValidationErrors = null;
            this.onChangeData = this.onChangeData.bind(this);
            this.submit = this.submit.bind(this);
            this.getValidationErrors = this.getValidationErrors.bind(this);
            this.getPath = this.getPath.bind(this);
            this.hasValidationError = this.hasValidationError.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
            this.getEventsEmitter = this.getEventsEmitter.bind(this);
            this.getFieldAttributes = this.getFieldAttributes.bind(this);
        }

        getChildContext() {
            return {
                getSchema: this.context.getSchema,
                getPath: this.getPath,
            };
        }

        componentWillMount() {
            this.updateModelWithValueOrOptions();
            this.registerListeners();
        }

        shouldComponentUpdate(nextProps) {
            const newProps = Object.assign({}, nextProps);
            const oldProps = Object.assign({}, this.props);
            const { name } = this.props;
            const { getModel, getValidationErrors } = this.context;
            return (
                !isEqual(getModel(name), this.fieldValue) ||
                !isEqual(getValidationErrors(name), this.fieldValidationErrors) ||
                !isEqual(newProps, oldProps)
            );
        }

        componentWillUnmount() {
            this.unregisterListeners();
        }

        onChangeData(value) {
            const { name, callbacks: { onChange } } = this.props;
            const { setModel, eventsEmitter, getPath } = this.context;
            if (typeof setModel === 'function') {
                setModel(name, value, () => {
                    if (eventsEmitter) {
                        eventsEmitter.emit('modelChange', {
                            name: `${getPath()}.${name}`,
                            value,
                        });
                    }
                    if (typeof onChange === 'function') onChange(value);
                });
            }
        }

        setCurrentFielValue(value) {
            if (Array.isArray(value)) {
                this.fieldValue = cloneArray(value);
                return;
            }
            if (typeof value === 'object') {
                this.fieldValue = cloneObject(value);
                return;
            }
            this.fieldValue = value;
        }

        getValue() {
            const { name, value } = this.props;
            const { getModel } = this.context;

            if (typeof getModel !== 'function') return value;

            const valueFromModel = getModel(name);
            const fieldValue = valueFromModel !== undefined
                ? valueFromModel
                : value;
            this.setCurrentFielValue(fieldValue);
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
            const { name, callbacks: { onError } } = this.props;
            const { getValidationErrors } = this.context;
            let results = [];
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
            const { fieldAttributes, callbacks: { onFocus, onBlur } } = this.props;
            return Object.assign({}, { onFocus, onBlur }, fieldAttributes);
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
            return this.getValidationErrors().length > 0;
        }

        render() {
            return (<Component
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
            />);
        }
    }

    FieldConnector.contextTypes = {
        setModel: PropTypes.func,
        getModel: PropTypes.func,
        getSchema: PropTypes.func,
        submitForm: PropTypes.func,
        getValidationErrors: PropTypes.func,
        getPath: PropTypes.func,
        eventsEmitter: PropTypes.shape({
            emit: PropTypes.func,
            registerEvent: PropTypes.func,
            listen: PropTypes.func,
            unregisterEvent: PropTypes.func,
            unlisten: PropTypes.func,
        }),
    };

    FieldConnector.childContextTypes = {
        getSchema: PropTypes.func,
        getPath: PropTypes.func,
    };

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
    };

    FieldConnector.defaultProps = {
        fieldAttributes: {},
        callbacks: {},
    };

    return FieldConnector;
};

export default FieldConnect;
