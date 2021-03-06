import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, SubmitField } from '../../components/styled/Bootstrap';
import { consoleData } from '../demoHelpers';

const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(-)?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{0,6}?\.[a-zA-Z]{2,6}$/;
const emailValidator = () => ({
    validator(value) {
        if (!value.match(regex)) {
            return false;
        }
        return true;
    },
    errorMessage: 'Inserted value is not a email adress',
});

const forgotPasswordSchema = new Schema({
    email: {
        type: String,
        required: true,
        validators: [emailValidator()],
    },
});

const ForgotPasswordForm = () => (
    <Form
        id="ForgotPasswordForm"
        schema={forgotPasswordSchema}
        onSubmit={data => consoleData(data)}
        onError={
            (validationErrors, data) =>
                consoleData('error', validationErrors, data)
        }
    >
        <h4>FORGOT PASSWORD FORM</h4>
        <h5>
            Please insert your email address and press send to reset password.
            We will send You reset password link with details.
        </h5>
        <TextField name="email" label="Email address" type="text" />
        <SubmitField value="Login" />
    </Form>
);

export default ForgotPasswordForm;
