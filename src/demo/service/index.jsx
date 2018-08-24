import React from 'react';
import Schema from 'form-schema-validation';
import {
    Form,
    TextField,
    TextareaField,
    NumberField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import { consoleData } from '../demoHelpers';

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
});

const ServiceForm = () => (
    <Form
        schema={serviceSchema}
        onSubmit={data => consoleData(data)}
        onError={(validationErrors, data) => consoleData('error', validationErrors, data)}
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
