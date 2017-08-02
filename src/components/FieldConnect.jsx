import React, { PropTypes } from 'react';
import { isNotEqualObject, isNotEqualValue, cloneArray, cloneObject } from '../helpers';

export const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.listeners = [];
            this.fieldValue = null;
            this.fieldErrors = null;
            this.onChangeData = this.onChangeData.bind(this);
            this.submit = this.submit.bind(this);
            this.getErrors = this.getErrors.bind(this);
            this.getPath = this.getPath.bind(this);
            this.hasError = this.hasError.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
            this.getEventsListener = this.getEventsListener.bind(this);
            this.getFieldAttributes = this.getFieldAttributes.bind(this);
        }

        static hasDiffrentErrors(newErrors, oldErrors) {
            const newErrorsArray = Array.isArray(newErrors) ? newErrors : [];
            const oldErrorsArray = Array.isArray(oldErrors) ? oldErrors : [];
            if (newErrorsArray.length !== oldErrorsArray.length) return true;
            let hasDifference = false;
            newErrorsArray.forEach((error, key) => {
                if(error !== oldErrorsArray[key]) hasDifference = true;
            });
            return hasDifference;
        }

        shouldComponentUpdate(nextProps) {
            const newProps = Object.assign({}, nextProps, { children: '' });
            const oldProps = Object.assign({}, this.props, { children: '' });
            const { name } = this.props;
            const { getModel, getErrors } = this.context;
            return (
                isNotEqualValue(getModel(name), this.fieldValue) ||
                isNotEqualValue(getErrors(name), this.fieldErrors) ||
                isNotEqualObject(newProps, oldProps)
            );
        }

        updateModelWithValueOrOptions() {
            const { name, value, options, defaultOption } = this.props;
            const { setModel } = this.context;

            if (!name || typeof setModel !== 'function') {
                return;
            }

            if (value) {
                setModel(name, value);
            } else if (Array.isArray(options) && options.length && defaultOption !== undefined) {
                setModel(
                    name,
                    options[defaultOption].label ?
                        options[defaultOption].value :
                        options[defaultOption]
                );
            }
        }

        registerListeners() {
            const { onChangeModel, onEmitEvents } = this.props;
            const { eventsListener } = this.context;
            if (eventsListener) {
                if (typeof onChangeModel === 'function') {
                    this.onChangeModelMethod = data => {
                        return onChangeModel(data, this);
                    };
                    eventsListener.registerEventListener('changeModel', this.onChangeModelMethod);
                }
                if (onEmitEvents) {
                    if(Array.isArray(onEmitEvents)){
                        onEmitEvents.forEach(({name, method}) => {
                            const listener = {
                                name,
                                method: data => {
                                    return method(data, this);
                                }
                            };
                            this.listeners.push(listener);
                            eventsListener.registerEventListener(name, listener.method)
                        });
                        return;
                    }
                    const { name, method } = onEmitEvents;
                    const listener = {
                        name,
                        method: data => {
                            return method(data, this);
                        }
                    };
                    this.listeners.push(listener);
                    eventsListener.registerEventListener(name, listener.method);
                }
            }
        }

        unregisterListeners() {
            const { onEmitEvents } = this.props;
            const { eventsListener } = this.context;
            if (eventsListener) {
                if (typeof this.onChangeModelMethod === 'function') {
                    eventsListener.unregisterEventListener('changeModel', this.onChangeModelMethod);
                }
                if (onEmitEvents && this.listeners.length > 0) {
                    this.listeners.forEach(({name, method}) => {
                        eventsListener.unregisterEventListener(name, method);
                    });
                }
            }
        }

        componentWillMount() {
            this.updateModelWithValueOrOptions();
            this.registerListeners();
        }

        componentWillUnmount() {
            this.unregisterListeners();
        }

        getChildContext() {
            return {
                getSchema: this.context.getSchema,
                getPath: this.getPath
            }
        }

        onChangeData(value) {
            const { name, callbacks: { onChange } } = this.props;
            const { setModel, eventsListener, getPath } = this.context;
            if (typeof setModel === 'function') {
                setModel(name, value, () => {
                    if (eventsListener) eventsListener.callEvent('changeModel', {
                        name:`${getPath()}.${name}`,
                        value
                    });
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
            if (typeof getSchema !== 'function') return;
            return getSchema(name);
        }

        getEventsListener() {
            return this.context.eventsListener;
        }

        submit(event) {
            const { submitForm } = this.context;
            if (typeof submitForm !== 'function') return;
            submitForm(event);
        }

        getErrors() {
            const { name, callbacks: { onError } } = this.props;
            const { getErrors } = this.context;
            let results = [];
            if (typeof getErrors === 'function') results = getErrors(name);
            this.fieldErrors = results;
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

        hasError() {
            return this.getErrors().length > 0;
        }

        render() {
            return (<Component
                {...this.getPropsFromSchema()}
                {...this.props}
                onChange={this.onChangeData}
                submit={this.submit}
                errors={this.getErrors()}
                error={this.hasError()}
                value={this.getValue()}
                eventsListener={this.getEventsListener()}
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
        getErrors: PropTypes.func,
        getPath: PropTypes.func,
        eventsListener: PropTypes.shape({
            callEvent: PropTypes.func,
            registerEvent: PropTypes.func,
            registerEventListener: PropTypes.func,
            unregisterEvent: PropTypes.func,
            unregisterEventListener: PropTypes.func,
        })
    };

    FieldConnector.childContextTypes = {
        getSchema: PropTypes.func,
        getPath: PropTypes.func
    };

    FieldConnector.defaultProps = {
        callbacks: {}
    };

    FieldConnector.propTypes = {
        name: PropTypes.string,
        value: PropTypes.any,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({})
        ])),
        defaultOption: PropTypes.number,
        onChangeModel: PropTypes.func,
        onEmitEvents: PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                method: PropTypes.func
            }),
            PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                method: PropTypes.func
            }))
        ]),
        callbacks: PropTypes.shape({
            onChange: PropTypes.func,
            onError: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func
        })
    };

    return FieldConnector;
};

export default FieldConnect;
