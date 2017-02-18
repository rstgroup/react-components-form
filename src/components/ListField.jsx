import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';

class ListField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            model: props.value || [],
            listLength: props.value ? props.value.length : 1,
            errors: {}
        };
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getList = this.getList.bind(this);
        this.addListElement = this.addListElement.bind(this);
        this.removeListElement = this.removeListElement.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    componentWillMount() {
        const { getSchema } = this.context;
        const schema = getSchema(this.props.name);
        this.setState({ schema })
    }

    setModel(name, value) {
        const [fieldName, key] = name.split('-');
        const model = Array.from(this.state.model);
        model[parseInt(key)] = value;
        this.setState({ model });
        if (typeof this.props.onChange === 'function') this.props.onChange(model);
    }

    getModel(name) {
        const [fieldName, key] = name.split('-');
        return this.state.model[key];
    }

    getSchema() {
        return this.state.schema;
    }

    getErrors(name) {
        return this.state.errors[name] || [];
    }

    addListElement(){
        this.setState({ listLength: this.state.listLength + 1 });
    }

    removeListElement(key) {
        const model = Array.from(this.state.model);
        model.splice(key, 1);
        this.setState({ model, listLength: this.state.listLength - 1 });
        if (typeof this.props.onChange === 'function') this.props.onChange(model);
    }

    getChildContext() {
        return {
            setModel: this.setModel,
            getModel: this.getModel,
            getSchema: this.getSchema,
            getErrors: this.getErrors
        }
    }

    getList(children) {
        const list = [];

        for(let key = 0; key < this.state.listLength; key += 1){
            const child = React.cloneElement(children, {
                name: `${this.props.name}-${key}`,
                value: this.state.model[key],
                key
            });

            list.push(
               <div key={key}>
                   <div>{child}</div>
                   <div><span onClick={() => this.removeListElement(key)}>remove</span></div>
               </div>
            );
        }
        return list;
    }

    render() {
        const { children, className, wrapperClassName, label } = this.props;
        return (
            <div className={wrapperClassName}>
                {label && <label>{label}</label>}
                <div className={className}>{this.getList(children)}</div>
                <span onClick={this.addListElement}>dodaj</span>
            </div>
        );
    }
}

ListField.contextTypes = {
    getSchema: PropTypes.func
};

ListField.childContextTypes = {
    setModel: PropTypes.func,
    getModel: PropTypes.func,
    getSchema: PropTypes.func,
    getErrors: PropTypes.func
};

ListField.propTypes = {
    model: PropTypes.object,
    schema: PropTypes.object
};

export default FieldConnect(ListField);
