import React, { Component } from 'react';
import Schema from 'form-schema-validation';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { FieldConnect } from '../../components/FieldConnect';

const getInternalSchema = () => new Schema({
    name: {
        type: String,
        validators: [
            {
                validator: (value) => {
                    if (value.length === 2) {
                        return 'FieldValidatorError';
                    }
                    return true;
                },
            },
        ],
    },
    surname: {
        type: String,
    },
    age: {
        type: String,
    },
});

class CustomField extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.context.setFieldValidator(this.setAuthorsValidator);
    }

    componentWillUnmount() {
        this.context.removeFieldValidator(this.setAuthorsValidator);
    }


    setAuthorsValidator = (_model, value) => {
        const schema = getInternalSchema();
        const allErrors = [];
        value.forEach((author) => {
            const errors = schema.validate(author);
            allErrors.push(!isEmpty(errors) ? errors : undefined);
        });
        return allErrors.length ? allErrors : true;
    };

    render() {
        return (
            <div />
        );
    }
}

CustomField.contextTypes = {
    setFieldValidator: PropTypes.func,
    removeFieldValidator: PropTypes.func,
};

CustomField.propTypes = {};

CustomField.defaultProps = {};

export default FieldConnect(CustomField);
