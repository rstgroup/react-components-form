import React from 'react';
import {
    Form,
    TextField,
    DateField,
    SelectField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';

const users = [
    {
        label: 'Select user',
        value: ''
    },
    {
        label: 'Jacki',
        value: '1'
    },
    {
        label: 'Max',
        value: '2'
    },
    {
        label: 'Joseph',
        value: '3'
    }
];

const services = [
    {
        label: 'Select service',
        value: ''
    },
    {
        label: 'Cleaning',
        value: '1'
    },
    {
        label: 'Cooking',
        value: '2'
    },
    {
        label: 'Health care',
        value: '3'
    }
];

const appointmentSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    clientName:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true,
        options: users
    },
    serviceId:{
        type: String,
        required: true,
        options: services
    }
});

const AppointmentForm = () => (
    <Form
        schema={appointmentSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h4>APPOINTMENT FORM</h4>
        <div className="row">
            <div className="col-xs-6">
                <DateField name="date" />
            </div>
            <div className="col-xs-6">
                <TextField name="time" type="time" />
            </div>
        </div>
        <TextField name="phone" placeholder="Phone number" />
        <TextField name="clientName" placeholder="Name & Surname" />
        <SelectField name="userId" label="Responsible person" />
        <SelectField name="serviceId" label="Service" />
        <SubmitField value="Submit" />
    </Form>
);

export default AppointmentForm;