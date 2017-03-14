import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';
import { FormEventsListener } from '../../components';

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

const LoginForm  = () => {
    const eventsListener = new FormEventsListener();
    return (
        <div>
            <Form
                schema={loginSchema}
                onSubmit={data => console.log(data)}
                onError={(errors, data) => console.log('error', errors, data)}
                eventsListener={eventsListener}
            >
                <h4>LOGIN FORM</h4>
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
            <h5>This is example of submit form outside form context</h5>
            <button onClick={() => eventsListener.callEvent('submit')}>Outside submit button</button>
            <button onClick={() => eventsListener.callEvent('validate')}>Outside validate button</button>
        </div>
    );
};

export default LoginForm;
