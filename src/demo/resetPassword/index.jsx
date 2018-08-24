import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';
import { consoleData } from '../demoHelpers';

const sameValueAs = fieldName => ({
    validator(value, type, model) {
        return value === model[fieldName];
    },
    errorMessage: 'Reapeted password is incorrect',
});

const resetPasswordSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true,
        validators: [sameValueAs('password')],
    },
});

const ResetPasswordForm = () => (
    <Form
        id="ResetPasswordForm"
        schema={resetPasswordSchema}
        onSubmit={data => consoleData(data)}
        onError={
            (validationErrors, data) =>
                consoleData('error', validationErrors, data)
        }
    >
        <h4>RESET PASSWORD FORM</h4>
        <h5>Please insert new password to your account.</h5>
        <TextField name="password" label="New password" type="text" />
        <TextField name="password2" label="Repeat new password" type="text" />
        <SubmitField value="Change password" />
    </Form>
);

export default ResetPasswordForm;
