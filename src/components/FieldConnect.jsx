import React, { PropTypes } from 'react';

export const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.onChangeData = this.onChangeData.bind(this);
            this.submit = this.submit.bind(this);
            this.getErrors = this.getErrors.bind(this);
            this.getPath = this.getPath.bind(this);
            this.hasError = this.hasError.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
            this.getEventsListener = this.getEventsListener.bind(this);
        }

        updateModelWithValueOrOptions() {
            const { name, value, options } = this.props;
            const { setModel } = this.context;

            if (!name || typeof setModel !== 'function') {
                return;
            }

            if (value) {
                setModel(name, value);
            } else if (Array.isArray(options) && options.length) {
                setModel(name, options[0].label ? options[0].value : options[0]);
            }
        }

        componentWillMount() {
            const { name, value, onChangeModel } = this.props;
            const { eventsListener } = this.context;
            this.updateModelWithValueOrOptions();
            if (eventsListener && typeof onChangeModel === 'function') {
                this.onChangeModelMethod = ({ name, value }) => {
                    return onChangeModel({ name, value }, this);
                };
                eventsListener.registerEventListener('changeModel', this.onChangeModelMethod);
            }
        }

        componentWillUnmount() {
            const { eventsListener } = this.context;
            if (eventsListener && typeof this.onChangeModelMethod === 'function') {
              eventsListener.unregisterEventListener('changeModel', this.onChangeModelMethod);
            }
        }

        getChildContext() {
            return {
                getSchema: this.context.getSchema,
                getPath: this.getPath
            }
        }

        onChangeData(value) {
            const { name } = this.props;
            const { setModel, eventsListener, getPath } = this.context;
            if (typeof setModel !== 'function') return;
            setModel(name, value, () => {
                if (eventsListener) eventsListener.callEvent('changeModel', {
                    name:`${getPath()}.${name}`,
                    value
                });
            });
        }

        getValue() {
            const { name, value } = this.props;
            const { getModel } = this.context;
            if (typeof getModel !== 'function') return value;
            return getModel(name) || value;
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
            const { name } = this.props;
            const { getErrors } = this.context;
            if (typeof getErrors !== 'function') return [];
            return getErrors(name);
        }

        getPath() {
            const { name } = this.props;
            const { getPath } = this.context;
            if (typeof getPath !== 'function') return name;
            return `${getPath()}.${name}`;
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

    FieldConnector.propTypes = {
        name: PropTypes.string,
        value: PropTypes.any,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({})
        ]))
    };

    return FieldConnector;
};

export default FieldConnect;
