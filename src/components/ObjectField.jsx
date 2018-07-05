import React from 'react';
import PropTypes from 'prop-types';
import Storage from './Storage';
import FieldConnect from './FieldConnect';
import FormContext from './FormContext';

export class ObjectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            model: props.value,
            validationErrors: {},
        };

        this.storage = new Storage(this.state.model);
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getValidationErrors = this.getValidationErrors.bind(this);
        this.setStateModel = this.setStateModel.bind(this);
    }

    componentWillMount() {
        const { getSchema } = this.getContext();
        const schema = getSchema(this.props.name).type;
        this.setState({ schema });
        this.storage.listen(this.setStateModel);
    }

    componentWillReceiveProps({ value }) {
        this.setState({ model: value });
        this.storage.setModel(value, null, true);
    }

    componentWillUnmount() {
        this.storage.unlisten(this.setStateModel);
    }

    getProviderContext() {
        return {
            setModel: this.setModel,
            getModel: this.getModel,
            getSchema: this.getSchema,
            getValidationErrors: this.getValidationErrors,
        };
    }

    getContext() {
        return this.props.context;
    }

    setStateModel(model, callback) {
        this.props.onChange(model);
        if (typeof callback === 'function') callback();
    }

    setModel(name, value, callback) {
        this.storage.set(name, value, callback);
    }

    getModel(name) {
        return this.state.model[name];
    }

    getSchema(name) {
        if (!this.state.schema) return {};
        if (Array.isArray(this.state.schema)) return this.state.schema[0].getField(name);
        return this.state.schema.getField(name);
    }

    getValidationErrors(name) {
        const { getValidationErrors } = this.getContext();
        const validationErrors = getValidationErrors(this.props.name);
        if (Array.isArray(validationErrors) && validationErrors.length === 1) {
            return validationErrors[0][name] || [];
        }
        return validationErrors[name] || [];
    }

    render() {
        const { context, children, wrapperClassName, fieldAttributes } = this.props;
        return (
            <FormContext.Provider value={{ ...context, ...this.getProviderContext() }}>
                <div className={wrapperClassName} {...fieldAttributes}>
                    {children}
                </div>
            </FormContext.Provider>
        );
    }
}

ObjectField.propTypes = {
    value: PropTypes.shape({}),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    wrapperClassName: PropTypes.string,
    fieldAttributes: PropTypes.shape({}),
    context: PropTypes.shape({}),
};

ObjectField.defaultProps = {
    value: {},
    name: undefined,
    children: '',
    wrapperClassName: '',
    fieldAttributes: {},
    context: {},
};

export default FieldConnect(ObjectField);
