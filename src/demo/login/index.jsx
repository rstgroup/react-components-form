import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';
import { consoleData } from '../demoHelpers';

const loginSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const LoginForm = () => (
    <Form
        schema={loginSchema}
        onSubmit={data => consoleData(data)}
        onError={(validationErrors, data) => consoleData('error', validationErrors, data)}
    >
        <h4>LOGIN FORM</h4>
        <TextField name="login" label="Login" type="text" />
        <TextField name="password" label="Password" type="text" />
        <SubmitField value="Login" />
    </Form>
);

export default LoginForm;
