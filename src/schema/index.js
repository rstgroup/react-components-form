import { pick, difference } from 'lodash';

const defaultMessages = {
    notDefinedKey(key) { return `Key "${key}" is not defined in schema`; },
    modelIsUndefined() { return `Validated model is undefined`; },
    validateString(key) { return `Field "${key}" is not a String`; },
    validateNumber(key) { return `Field "${key}" is not a Number`; },
    validateObject(key) { return `Field "${key}" is not a Object`; },
    validateArray(key) { return `Field "${key}" is not a Array`; }
};

class Schema {
    constructor(schema, messages) {
        this.schema = schema;
        this.errors = {};
        this.messages = messages || defaultMessages;

        this.validateTypeString = this.validateTypeString.bind(this);
        this.validateTypeNumber = this.validateTypeNumber.bind(this);
        this.validateTypeObject = this.validateTypeObject.bind(this);
        this.validateTypeArray = this.validateTypeArray.bind(this);
        this.validateTypeSchema = this.validateTypeSchema.bind(this);

        this.typesValidators = {
            String: this.validateTypeString,
            Number: this.validateTypeNumber,
            Object: this.validateTypeObject,
            Array: this.validateTypeArray
        };
    }

    getField(name) {
        return this.schema[name];
    }

    getFields() {
        return this.schema;
    }

    validate(model) {
        this.errors = {};
        if(this.checkModel(model)) {
            this.checkKeysDiff(model);
            this.checkTypesAndValidators(model);
        }
        return this.errors;
    }

    setError(key, message) {
        if (!this.errors[key]) this.errors[key] = [];
        this.errors[key].push(message);
    }

    checkModel(model) {
        if(!model) {
            this.setError('model', this.messages.modelIsUndefined());
            return false;
        }
        return true;
    }

    checkKeysDiff(model) {
        const modelKeys = Object.keys(model);
        const schemaKeys = Object.keys(this.schema);
        const keysDiff = difference(modelKeys, schemaKeys) || [];
        if (keysDiff.length > 0) {
            keysDiff.forEach(key => {
                this.setError(key, this.messages.notDefinedKey(key));
            });
        }
    }

    checkTypesAndValidators(model) {
        const schemaKeys = Object.keys(this.schema);
        const validatedObject = pick(model, schemaKeys);
        schemaKeys.forEach(key => {
            const value = validatedObject[key];
            const fieldSchema = this.schema[key];
            const isArrayOfType = Array.isArray(fieldSchema.type);
            const fieldType = isArrayOfType ? fieldSchema.type[0] : fieldSchema.type;
            if (isArrayOfType && this.validateType(Array, value)){
                value.forEach(item => {
                    this.validateType(fieldType, item, key);
                });
            } else {
                this.validateType(fieldType, value, key);
            }
            this.validateRequired()
            if (fieldSchema.validators) {
                console.log('field has validators', fieldSchema.validators);
            }
        })
    }

    validateType(type, value, key) {
        if (typeof this.typesValidators[type.name] === 'function') {
            return this.typesValidators[type.name](value, key, type);
        }
        if (type.constructor.name === 'Schema') {
            return this.validateTypeSchema(value, key, type)
        }
        throw Error(`Unrecognized type ${type.name}`);
    }

    validateTypeString(value, key) {
        if (typeof value === 'string') return true;
        this.setError(key, this.messages.validateString(key));
        return false;
    }

    validateTypeNumber(value, key) {
        if (typeof value === 'number') return true;
        this.setError(key, this.messages.validateNumber(key));
        return false;
    }

    validateTypeObject(value, key) {
        if (typeof value === 'object' && !Array.isArray(value)) return true;
        this.setError(key, this.messages.validateObject(key));
        return false;
    }

    validateTypeArray(value, key) {
        if (Array.isArray(value)) return true;
        this.setError(key, this.messages.validateArray(key));
        return false;
    }

    validateTypeSchema(value, subSchemaKey, type) {
        if(typeof type.validate === 'function'){
            const errors = type.validate(value) || {};
            const keys = Object.keys(errors) || [];
            if(keys.length === 0) return true;
            keys.forEach(key => {
                errors[key].forEach(error => this.setError(subSchemaKey, error));
            });
            return false;
        }
        throw Error(`SubSchema on key "${subSchemaKey}" don't have validate method`);
    }
}

export default Schema;