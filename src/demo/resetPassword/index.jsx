import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';

const sameValueAs = (fieldName) => ({
    validator(value, type, model){
        return value === model[fieldName];
    },
    errorMessage: 'Reapeted password is incorrect'
});

const resetPasswordSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true,
        validators: [sameValueAs('password')]
    }
});

const items = [
    'test1',
    'test2',
    'test3'
];

const ForgotPasswordForm  = () => (
    <Form
        schema={resetPasswordSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h4>RESET PASSWORD FORM</h4>
        <h5>Please insert new password to your account.</h5>
        <TextField name="password" label="New password" type="text" />
        <TextField name="password2" label="Repeat new password" type="text" />
        <SubmitField value="Change password" />
    </Form>
);

export default ForgotPasswordForm;
