import React from 'react';
import {
    Form,
    TextField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';

const loginSchema = new Schema({
    login:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const model = {
    login: 'maniek',
    password: 'maniek123'
};

const LoginForm  = () => (
    <Form
        schema={loginSchema}
        model={model}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h2>LOGIN FORM</h2>
        <TextField name="login" label="Login" type="text" />
        <TextField name="password" label="Login" type="text" />
        <SubmitField value="Submit" />
    </Form>
);

export default LoginForm;
