import React from 'react';
import {
    Form,
    TextField,
    TextareaField,
    NumberField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';

const serviceSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    time:{
        type: Number,
        required: true
    }
});

const ServiceForm = () => (
    <Form
        schema={serviceSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h4>SERVICE FORM</h4>
        <TextField name="title" label="Title" />
        <TextareaField name="description" label="Description" />
        <NumberField name="price" label="Price" type="float" />
        <NumberField name="time" label="Time (min)" />
        <SubmitField value="Save" />
    </Form>
);

export default ServiceForm;