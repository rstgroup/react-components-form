import React, { PropTypes } from 'react';

export const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.onChangeData = this.onChangeData.bind(this);
            this.submit = this.submit.bind(this);
            this.getErrors = this.getErrors.bind(this);
            this.hasError = this.hasError.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
            this.getEventsListener = this.getEventsListener.bind(this);
        }

        componentWillMount() {
            const { name, value, options, onChangeModel } = this.props;
            const { setModel, eventsListener } = this.context;
            if (typeof setModel !== 'function') return;
            if (name && value) setModel(name, value);
            if (name && !value && options) setModel(name, options[0]);
            if (eventsListener && typeof onChangeModel === 'function') {
                eventsListener.registerEventListener('changeModel', onChangeModel);
            }
        }

        componentWillUnmount() {
          const { onChangeModel } = this.props;
          const { eventsListener } = this.context;
          if (eventsListener && typeof onChangeModel === 'function') {
              eventsListener.unregisterEventListener('changeModel', onChangeModel);
          }
        }

        getChildContext() {
            return {
                getSchema: this.context.getSchema
            }
        }

        onChangeData(value) {
            const { name } = this.props;
            const { setModel } = this.context;
            if (typeof setModel !== 'function') return;
            setModel(name, value);
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

        submit() {
            const { submitForm } = this.context;
            if (typeof submitForm !== 'function') return;
            submitForm();
        }

        getErrors() {
            const { name } = this.props;
            const { getErrors } = this.context;
            if (typeof getErrors !== 'function') return [];
            return getErrors(name);
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
            />);
        }
    }

    FieldConnector.contextTypes = {
        setModel: PropTypes.func,
        getModel: PropTypes.func,
        getSchema: PropTypes.func,
        submitForm: PropTypes.func,
        getErrors: PropTypes.func,
        eventsListener: PropTypes.shape({
            callEvent: PropTypes.func,
            registerEvent: PropTypes.func,
            registerEventListener: PropTypes.func,
            unregisterEvent: PropTypes.func,
            unregisterEventListener: PropTypes.func,
        })
    };

    FieldConnector.childContextTypes = {
        getSchema: PropTypes.func
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
