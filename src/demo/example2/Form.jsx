import React from 'react';
import {
    Form,
    TextField,
    TextareaField,
    NumberField,
    DateField,
    SelectField,
    SubmitField,
    CheckboxField,
    ObjectField
} from '../../components';
import Schema from 'form-schema-validation';

const personSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String
    }
});

const exampleSchema = new Schema({
    textField:{
        type: String,
        label: 'Text'
    },
    textareaField:{
        type: String,
        label: 'Textarea'
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
        type: Date,
        label: 'Date'
    },
    person:{
        type: personSchema,
        label: 'Person'
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


class Example2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        return (
            <Form
                schema={exampleSchema}
                onSubmit={data => this.setState({data})}
                onError={(errors, data) => console.log('error', errors, data)}
            >
                <h4>ALL FIELDS FORM</h4>
                <TextField name="textField" type="text" />
                <TextareaField name="textareaField" />
                <NumberField name="numberField" />
                <TextField name="hiddenField" type="hidden" value="test" />
                <DateField name="dateField" />
                <SelectField name="selectField" />
                <CheckboxField name="checkboxField" />
                <ObjectField name="person">
                    <TextField name="name" placeholder="name"/>
                    <TextField name="surname" placeholder="surname"/>
                </ObjectField>
                <SubmitField value="Submit" />
                <div>
                    <h4>Saved data:</h4>
                    {JSON.stringify(this.state.data)}
                </div>
            </Form>
        );
    }
}

export default Example2;