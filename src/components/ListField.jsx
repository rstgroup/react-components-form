import React, { PropTypes } from 'react';
import FieldConnect from './FieldConnect';

export class ListField extends React.Component {
    constructor(props, { getSchema }) {
        super(props);
        this.state = {
            schema: getSchema(props.name),
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

    setModel(name, value, callback) {
        const [fieldName, key] = name.split('-');
        const model = Array.from(this.state.model);
        model[parseInt(key)] = value;
        this.setState({ model }, callback);
        this.props.onChange(model);
    }

    getModel(name) {
        const [fieldName, key] = name.split('-');
        return this.state.model[key];
    }

    getSchema() {
        return this.state.schema;
    }

    getErrors(name) {
        const [fieldName, key] = name.split('-');
        const { getErrors } = this.context;
        const errors = getErrors(fieldName);
        return errors[parseInt(key)] || [];
    }

    addListElement(){
        this.setState({ listLength: this.state.listLength + 1 });
    }

    removeListElement(key) {
        const model = Array.from(this.state.model);
        model.splice(key, 1);
        this.setState({ model, listLength: this.state.listLength - 1 });
        this.props.onChange(model);
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
        const {
            name,
            removeButton: {
                wrapperClassName,
                className,
                value
            } = {},
            hideRemoveButton
        } = this.props;

        for(let key = 0; key < this.state.listLength; key += 1){
            const child = React.cloneElement(children, {
                name: `${name}-${key}`,
                value: this.state.model[key],
                key
            });

            list.push(
               <div key={`${name}-${key}`}>
                   <div>{child}</div>
                   {!hideRemoveButton && <div className={wrapperClassName}>
                       <span
                           onClick={() => this.removeListElement(key)}
                           className={className}
                       >
                           {value || 'Remove'}
                       </span>
                   </div>}
               </div>
            );
        }
        return list;
    }

    render() {
        const {
            children,
            className,
            wrapperClassName,
            label,
            addButton = {},
            hideAddButton,
            fieldAttributes = {}
        } = this.props;
        return (
            <div className={wrapperClassName}>
                {label && <label>{label}</label>}
                <div className={className} {...fieldAttributes}>{this.getList(children)}</div>
                {!hideAddButton && <span
                    onClick={this.addListElement}
                    className={addButton.className}
                >
                    {addButton.value || 'Add'}
                </span>}
            </div>
        );
    }
}

ListField.contextTypes = {
    getSchema: PropTypes.func,
    getErrors: PropTypes.func
};

ListField.childContextTypes = {
    setModel: PropTypes.func,
    getModel: PropTypes.func,
    getSchema: PropTypes.func,
    getErrors: PropTypes.func
};

ListField.propTypes = {
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    label: PropTypes.string,
    addButton: PropTypes.shape({
        className: PropTypes.string,
        value: PropTypes.node
    }),
    removeButton: PropTypes.shape({
        wrapperClassName: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.node
    }),
    hideAddButton: PropTypes.bool,
    hideRemoveButton: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    value: PropTypes.any,
    fieldAttributes: PropTypes.shape({})
};

export default FieldConnect(ListField);
