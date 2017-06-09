import React, { PropTypes } from 'react';
import Storage from './Storage';
import FieldConnect from './FieldConnect';

export class ObjectField extends React.Component {
    static defaultProps = {
        value: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            model: props.value,
            errors: {}
        };

        this.storage = new Storage(this.state.model);
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.setStateModel = this.setStateModel.bind(this);
    }

    componentWillReceiveProps ({ value }) {
        this.setState({ model: value });
        this.storage.setModel(value, null, true);
    }

    componentWillMount() {
        const { getSchema } = this.context;
        const schema = getSchema(this.props.name).type;
        this.setState({ schema });
        this.storage.listen(this.setStateModel);
    }

    componentWillUnmount() {
        this.storage.unlisten(this.setStateModel);
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

    getErrors(name) {
        const { getErrors } = this.context;
        const errors = getErrors(this.props.name);
        if(Array.isArray(errors) && errors.length === 1){
            return errors[0][name] || [];
        }
        return errors[name] || [];
    }

    getChildContext() {
        return {
            setModel: this.setModel,
            getModel: this.getModel,
            getSchema: this.getSchema,
            getErrors: this.getErrors
        }
    }

    render() {
        const { children, wrapperClassName, fieldAttributes } = this.props;
        return (
            <div className={wrapperClassName} {...fieldAttributes}>
                {children}
            </div>
        );
    }
}

ObjectField.contextTypes = {
    getSchema: PropTypes.func,
    getErrors: PropTypes.func
};

ObjectField.childContextTypes = {
    setModel: PropTypes.func,
    getModel: PropTypes.func,
    getSchema: PropTypes.func,
    getErrors: PropTypes.func
};

ObjectField.propTypes = {
    value: PropTypes.shape({}),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    wrapperClassName: PropTypes.string,
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(ObjectField);
