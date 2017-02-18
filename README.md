# REACT COMPONENTS FORM

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg" />
<img src="https://img.shields.io/badge/license-MIT-blue.svg" />

React components form give you posibility to create forms with schema validation using "form-schema-validation". You can easy create any form with any inputs and create Your own custom fields and validators. Also You can create object fields that represents some object data. Please read another sections of this readme to check what You can use in your project.

####EXAMPLE LOGIN FORM
```js
import React from 'react';
import { Form, TextField, SubmitField } from 'react-components-form';
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

const LoginForm  = () => (
    <Form
        schema={loginSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <TextField name="login" label="Login" type="text" />
        <TextField name="password" label="Login" type="text" />
        <SubmitField value="Submit" />
    </Form>
);

export default LoginForm;

```

#### Fields

You can use current fields or create new fields. Here You have list of fields.

| Field name | Allowed values | Description |
|---|---|---|
| TextField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| TextareaField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| SelectField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| SubmitField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| NumberField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| DateField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| CheckboxField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
| ObjectField | type, wrapperClassName, className, placeholder | This field is normal input that return string value |
