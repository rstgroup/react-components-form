import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';
import { FormEventsEmitter } from '../../components';

const loginSchema = new Schema({
    login:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const LoginForm  = () => {
    const eventsEmitter = new FormEventsEmitter();
    return (
        <div>
            <Form
                schema={loginSchema}
                onSubmit={data => console.log(data)}
                onError={(validationErrors, data) => console.log('error', validationErrors, data)}
                eventsEmitter={eventsEmitter}
            >
                <h4>LOGIN FORM</h4>
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
            <h5>This is example of submit form outside form context</h5>
            <button onClick={() => eventsEmitter.emit('submit')}>Outside submit button</button>
            <button onClick={() => eventsEmitter.emit('validate')}>Outside validate button</button>
        </div>
    );
};

export default LoginForm;
