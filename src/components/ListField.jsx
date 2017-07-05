import React, { PropTypes } from 'react';
import Storage from './Storage';
import FieldConnect from './FieldConnect';

export class ListField extends React.Component {
    static defaultProps = {
        value: []
    };

    static generateItemId() {
        return Math.random().toString(36).substring(7);
    }
    constructor(props, { getSchema }) {
        super(props);
        this.state = {
            schema: getSchema(props.name),
            model: this.getModelFromProps(props),
            errors: {}
        };

        this.storage = new Storage(this.state.model);
        this.setModel = this.setModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getList = this.getList.bind(this);
        this.addListElement = this.addListElement.bind(this);
        this.removeListElement = this.removeListElement.bind(this);
        this.getSchema = this.getSchema.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.setStateModel = this.setStateModel.bind(this);
    }

    componentWillReceiveProps({ value }) {
        let shouldSetState = false;
        value.forEach((item, key) => {
            if (item !== this.state.model[key].value) shouldSetState = true;
        });
        if (shouldSetState) this.storage.setModel(this.getModelFromProps({ value }));
    }

    componentWillMount() {
        this.storage.listen(this.setStateModel);
    }

    componentWillUnmount() {
        this.storage.unlisten(this.setStateModel);
    }

    setStateModel(model, callback) {
        this.setState({ model }, callback);
        this.props.onChange(model.map(item => item.value));
    }

    getModelFromProps(props) {
        if (props.value.length > 0) {
            return props.value.map(item => ({
                id: ListField.generateItemId(),
                value: item
            }));
        }
        return [];
    }

    setModel(name, value, callback) {
        const [fieldName, key] = name.split('-');
        const model = Array.from(this.state.model);
        model[parseInt(key)].value = value;
        this.storage.setModel(model, callback);
    }

    getModel(name) {
        const [fieldName, key] = name.split('-');
        return this.state.model[key].value;
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

    getDefaultValueForListItem() {
        if (
            this.state.schema &&
            this.state.schema.type &&
            this.state.schema.type[0] &&
            typeof this.state.schema.type[0] === 'object' &&
            typeof this.state.schema.type[0].getDefaultValues === 'function'
        ) {
            return this.state.schema.type[0].getDefaultValues();
        }
        return undefined;
    }

    addListElement(){
        const model = Array.from(this.state.model);
        model.push({
            id: ListField.generateItemId(),
            value: this.getDefaultValueForListItem()
        });
        this.setState({ model });
    }

    removeListElement(key) {
        const model = Array.from(this.state.model);
        model.splice(key, 1);
        this.setState({ model });
        this.props.onChange(model.map(item => item.value));
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
        const {
            name,
            removeButton: {
                wrapperClassName,
                className,
                value
            } = {},
            hideRemoveButton,
            itemWrapperClassName
        } = this.props;

        return this.state.model.map((item, key) => {
            const child = React.cloneElement(children, {
                name: `${name}-${key}`,
                value: item.value,
                key: item.id
            });

            return (
               <div key={item.id} className={itemWrapperClassName}>
                   {child}
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
        });
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
    itemWrapperClassName: PropTypes.string,
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
