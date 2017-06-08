import React, { PropTypes } from 'react';
import Storage from './Storage';
import { cloneObject } from '../helpers';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: props.schema || {},
            model: props.model || this.getDefaultModelValue(props.schema),
            errors: {},
            validateOnChange: props.validateOnChange,
        };

        this.storage = new Storage(this.state.model);
        this.eventsListener = props.eventsListener;
        this.setModel = this.setModel.bind(this);
        this.setStateModel = this.setStateModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.runSubmit = this.runSubmit.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.getPath = this.getPath.bind(this);
        this.validateModel = this.validateModel.bind(this);
        this.submitListener = this.submitListener.bind(this);
        this.validateListener = this.validateListener.bind(this);
        this.resetListener = this.resetListener.bind(this);
    }

    submitListener() {
        return this.submitForm();
    }

    validateListener(schema) {
        return this.validateModel(this.state.model, schema || this.state.schema);
    }

    resetListener(model) {
        const newModel = model || this.getDefaultModelValue(this.state.schema);
        this.storage.setModel(newModel);
    }

    componentWillMount() {
        this.storage.listen(this.setStateModel);
        if (this.eventsListener) {
            this.eventsListener.registerEventListener('submit', this.submitListener);
            this.eventsListener.registerEventListener('validate', this.validateListener);
            this.eventsListener.registerEventListener('reset', this.resetListener);
        }
    }

    componentWillUnmount() {
        this.storage.unlisten(this.setStateModel);
        this.storage.setModel({});
        if (this.eventsListener) {
            this.eventsListener.unregisterEventListener('submit', this.submitListener);
            this.eventsListener.unregisterEventListener('validate', this.validateListener);
            this.eventsListener.unregisterEventListener('reset', this.resetListener);
        }
    }

    getDefaultModelValue(schema) {
        if (schema && typeof schema.getDefaultValues === 'function') return schema.getDefaultValues();
        return {};
    }

    setStateModel(model, callback) {
        this.setState({ model }, callback);
    }

    setModel(name, value, callback) {
        const model = Object.assign({}, this.state.model);
        model[name] = value;
        this.storage.set(name, value, callback);
        if (this.state.validateOnChange) this.validateModel(model, this.state.schema);
    }

    getModel(name) {
        return this.state.model[name];
    }

    getSchema(name) {
        if(typeof this.state.schema.getField !== 'function') return {};
        return this.state.schema.getField(name);
    }

    getErrors(name) {
        return this.state.errors[name] || {};
    }

    getPath() {
        return this.props.id;
    }

    validateModel(model, schema) {
        const { customValidation } = this.props;
        let errors = {};
        if (typeof schema.validate === 'function') errors = schema.validate(model);
        if (typeof customValidation === 'function') errors = customValidation(model);
        if (errors instanceof Promise) {
            return new Promise((resolve) => {
                errors.then(errorsFromPromise => {
                    this.setState({errors: errorsFromPromise});
                    resolve(errorsFromPromise);
                });
            })
        }
        this.setState({errors, validateOnChange: true});
        return errors;
    }

    submitForm(event) {
        const model = Object.assign({}, this.state.model);
        const errors = this.validateModel(model, this.state.schema);

        if (event) {
            event.preventDefault();
        }

        if (errors instanceof Promise){
            errors.then((errors) => {
                this.runSubmit(errors, model);
            });
            return;
        }
        return this.runSubmit(errors, model);
    }

    runSubmit(errors, modelData) {
        const model = cloneObject(modelData);
        if (Object.keys(errors).length > 0) {
            if (this.props.onError) this.props.onError(errors, model);
            return;
        }
        this.setState({validateOnChange: false});
        this.props.onSubmit(model);
        return model;
    }

    getChildContext() {
        return {
            setModel: this.setModel,
            getModel: this.getModel,
            getSchema: this.getSchema,
            submitForm: this.submitForm,
            getErrors: this.getErrors,
            getPath: this.getPath,
            eventsListener: this.eventsListener,
        }
    }

    render() {
        const { children, className, subform, id } = this.props;

        if (subform) {
            return (
                <div className={className}>
                    {children}
                </div>
            );
        }
        return (
            <form onSubmit={this.submitForm} id={id} className={className}>
                {children}
            </form>
        );
    }
}

Form.childContextTypes = {
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

Form.propTypes = {
    model: PropTypes.shape({}),
    schema: PropTypes.shape({}),
    onError: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    validateOnChange: PropTypes.bool,
    customValidation: PropTypes.func,
    subform: PropTypes.bool,
    eventsListener: PropTypes.shape({
        callEvent: PropTypes.func,
        registerEvent: PropTypes.func,
        registerEventListener: PropTypes.func,
        unregisterEvent: PropTypes.func,
        unregisterEventListener: PropTypes.func,
    })
};

Form.defaultProps = {
    id: 'form'
};

export default Form;
