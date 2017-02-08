import React from 'react';
import {
    Form,
    TextField,
    NumberField,
    SelectField,
    SubmitField,
    CheckboxField
} from '../components';
import Schema from 'form-schema-validation';

const simpleSchema = new Schema({
    textField:{
        type: String,
        label: 'Text'
    },
    numberField:{
        type: Number,
        label: 'Number'
    },
    hiddenField:{
        type: String,
        label: 'Hidden'
    },
    dateField:{
        type: String,
        label: 'Date'
    },
    selectField:{
        type: String,
        label: 'Select',
        options: [
            'test1',
            'test2',
            'test3',
            'test4',
            'test5'
        ]
    },
    checkboxField:{
        type: Boolean,
        label: 'Checkbox',
        required: true
    }
});


class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form
                schema={simpleSchema}
                onSubmit={(data) => console.log('success', data)}
                onError={(errors, data) => console.log('error', errors, data)}
            >
                <TextField name="textField" type="text" />
                <NumberField name="numberField" />
                <TextField name="hiddenField" type="hidden" value="test" />
                <TextField name="dateField" type="date" />
                <SelectField name="selectField" />
                <CheckboxField name="checkboxField" />
                <SubmitField value="Submit" />
            </Form>
        );
    }
}

export default SimpleForm;