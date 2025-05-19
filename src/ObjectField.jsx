import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import Storage from './Storage';
import FieldConnect from './FieldConnect';
import FormContext from "./FormContext.js";

export class ObjectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            model: props.value ? props.value : {},
            validationErrors: {},
        };

        this.storage = new Storage(this.state.model);
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getValidationErrors = this.getValidationErrors.bind(this);
        this.setStateModel = this.setStateModel.bind(this);
    }

    getProviderContext() {
        return {
            ...this.context,
            setModel: this.setModel,
            getModel: this.getModel,
            getSchema: this.getSchema,
            getValidationErrors: this.getValidationErrors,
        };
    }

    UNSAFE_componentWillMount() { // eslint-disable-line
        const { getSchema } = this.context;
        const schema = getSchema(this.props.name).type;
        this.setState({ schema });
        this.storage.listen(this.setStateModel);
    }

    UNSAFE_componentWillReceiveProps({ value = {} }) { // eslint-disable-line
        this.setState({ model: value });
        this.storage.setModel(value, null, true);
    }

    componentWillUnmount() {
        this.storage.unlisten(this.setStateModel);
    }

    setStateModel(model, callback) {
        this.props.onChange(cloneDeep(model));
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
        const { getValidationErrors } = this.context;
        const validationErrors = getValidationErrors(this.props.name);
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            let errors = [];
            validationErrors.forEach((error) => {
                if (typeof error === 'object' && error[name]) {
                    errors = [...errors, ...error[name]];
                }
            });
            return errors;
        }
        return validationErrors[name] || [];
    }

    render() {
        const { children, wrapperClassName, fieldAttributes } = this.props;
        return (
            <FormContext.Provider value={this.getProviderContext()}>
                <div className={wrapperClassName} {...fieldAttributes}>
                    {children}
                </div>
            </FormContext.Provider>
        );
    }
}

ObjectField.contextType = FormContext;

ObjectField.propTypes = {
    value: PropTypes.shape({}),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    wrapperClassName: PropTypes.string,
    fieldAttributes: PropTypes.shape({}),
};

ObjectField.defaultProps = {
    value: undefined,
    name: undefined,
    children: '',
    wrapperClassName: '',
    fieldAttributes: {},
};

export default FieldConnect(ObjectField);
