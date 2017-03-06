import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';

export class ObjectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            model: props.value || {},
            errors: {}
        };
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    componentWillMount() {
        const { getSchema } = this.context;
        const schema = getSchema(this.props.name).type;
        this.setState({ schema })
    }

    setModel(name, value) {
        const model = Object.assign({}, this.state.model);
        model[name] = value;
        this.setState({ model });
        if (typeof this.props.onChange === 'function') this.props.onChange(model);
    }

    getModel(name) {
        return this.state.model[name];
    }

    getSchema(name) {
        if(!Array.isArray(this.state.schema)) return this.state.schema.getField(name);
        return this.state.schema[0].getField(name);
    }

    getErrors(name) {
        const { getErrors } = this.context;
        const errors = getErrors(this.props.name);
        if(Array.isArray(errors)){
            const returnedErrors = [];
            errors.forEach(error => {
                if (error[name]) returnedErrors.push(error[name]);
            });
            return returnedErrors;
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
        const { children, wrapperClassName } = this.props;
        return (
            <div className={wrapperClassName}>
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
    onChange: PropTypes.func,
    children: PropTypes.node,
    wrapperClassName: PropTypes.string
};

export default FieldConnect(ObjectField);
