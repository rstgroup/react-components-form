import React from 'react';
import { Form, TextField, ObjectField, SubmitField } from '../components';
import Schema from '../schema';

const testSchema = new Schema({
    data:{
        type: String
    },
    message:{
        type: String
    }
});

console.log(testSchema.name);

const simpleSchema = new Schema({
    title:{
        type: String,
        label: 'Title'
    },
    description:{
        type: String,
        label: 'Description'
    },
    test:{
        type: testSchema,
        label: 'Test'
    }
});

const model = {
    title: 'test',
    description: 'dddddd'
};

class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form
                schema={simpleSchema}
                model={model}
                onSubmit={(data) => console.log('success', data)}
                onError={(data) => console.log('error', data)}
            >
                <TextField name="title" />
                <TextField name="description" />
                <ObjectField name="test" />
                <SubmitField value="Sumit" />
            </Form>
        );
    }
}

export default SimpleForm;