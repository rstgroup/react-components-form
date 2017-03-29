# REACT COMPONENTS FORM

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg" />
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg" />
<img src="https://img.shields.io/badge/license-MIT-blue.svg" />
<img src="https://img.shields.io/badge/npm-v1.6.0-blue.svg" />

1. [Installation](#installation)
2. [Description](#description)
3. [Demo](#demo)
4. [Tests](#tests)
4. [Form props](#form-props)
5. [Fields](#fields)
    - [Fields props](#fields-props)
    - [How create new field](#how-create-new-field)
6. [FormEventsListener](#formeventslistener)
7. [How to use](#how-to-use)
    - [Example of login form](#example-of-login-form)
    - [Example of login form in edit mode](#example-of-login-form-in-edit-mode)
    - [Example of login form with FormEventsListener submit and onChangeModel](#example-of-login-form-with-formeventslistener-submit-and-onchangemodel)
    - [Example of registration form](#example-of-registration-form)
    - [Example of use SelectField](#example-of-use-selectfield)
    - [Example of use ObjectField](#example-of-use-objectfield)
    - [Example of use ListField](#example-of-use-listfield)
    - [Example of use FieldsRestyle](#example-of-use-fieldsrestyle)
8. [Separate fields](#separate-fields)
9. [Bootstrap fields](#bootstrap-fields)


###Installation

```bash
$ npm install react --save
```

```bash
$ npm install form-schema-validation --save
```

```bash
$ npm install react-components-form --save
```

###Description

React components form give you posibility to create forms with schema validation using "form-schema-validation". You can easy create any form with any inputs and create Your own custom fields and validators. Also You can create object fields that represents some object data. Please read another sections of this readme to check what You can use in your project.

###Demo

Live demo:
https://mprzodala.github.io/react-components-form/

Localhost demo:
You can run demo by clone repository and run webpack-dev-server:

```bash
$ git clone https://github.com/mprzodala/react-components-form.git
```

```bash
$ cd react-components-form
```

```bash
$ npm install
```

```bash
$ npm run start
```

Now go to http://localhost:8080 in your browser.

###Tests

If You want run tests. Please clone this project repository

```bash
$ git clone https://github.com/mprzodala/react-components-form.git
```

Go to project directory

```bash
$ cd react-components-form
```

Install node module

```bash
$ npm install
```

Run "Jest" tests

```bash
$ npm run test
```

###Form props

| Props name | Type |
|---|---|
| schema | Instance of Schema from "form-schema-validation" |
| model | Object |
| onSubmit | Function(model) |
| onError | Function(errors, model) |
| validateOnChange | Boolean |
| customValidation | Function(model) { return errors} |
| eventsListener | Instance of FormEventsListener |
| className | String |

###Fields

You can use current fields or create new fields. Here You have list of fields.

| Field name | Description |
|---|---|
| TextField | This field is normal input that return string value |
| TextareaField | This field is normal textarea that return string value |
| SelectField | This field is normal select that return string value |
| SubmitField | This field create submit form button |
| NumberField | This field is normal input with type number and return Integer |
| DateField | This field is normal input with type date and return Date Object |
| CheckboxField | This field is normal checkbox that return Boolean |
| ObjectField | This field give You posibility to wrap another fields to object |
| ListField | This field give You posibility to create list of fields with add and remove buttons |

####Fields props

| Props name | Type |
|---|---|
| name | String |
| type | String |
| value | String, Number, Object, Date, [String], [Number], [Object], [Date] |
| label | String, Node |
| placeholder | String |
| options | [String], [{label: String, value: String}] |
| errorStyles | {className, itemClassName, ErrorComponent} |
| fieldAttributes | Object with html attributes for input |
| eventsListener | Instance of FormEventsListener (prop avaible if you have eventListener in form) |

###FormEventsListener

You can submit your form outside form context by use FormEventsListener. Form register submit and validate events if have eventsListener in props. When form have eventListener on all fields you can use onChangeModel method by props on field or use eventsListener on Your custom field to change state of field etc.

| Method name | Arguments |
|---|---|
| registerEvent | name: String |
| registerEventListener | name: String<br />method: Function(data: Any) |
| unregisterEvent | name: String |
| unregisterEventListener | name: String, handler: Instance of registred function |
| callEvent | name: String<br />data: Any |

####How create new field

If You want create Your own custom field You must create component that use onChange method from props when value is changed and on export use FieldConnect method. FieldConnect will wrap Your field component and give props from form to Your field. Abow You have example of custom text field that have icon.

```js
import React from 'react';
import { FieldConnect, ErrorField } from 'react-components-form';

const CustomTextField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    errors,
    error,
    value,
    label,
    placeholder,
    errorStyles = {}
    fieldAttributes = {}
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <input
            type="text"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        <icon className="some-icon-class" />
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

export default FieldConnect(CustomTextField);
```

###How to use

You can define any form. Abow You have example of login and registration form. 

####Example of login form

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

####Example of login form in edit mode

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

const model = {
    login: 'TestLogin',
    password: '1234'
};

const LoginForm  = () => (
    <Form
        schema={loginSchema}
        model={model}
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

####Example of login form with FormEventsListener submit and onChangeModel

```js
import React from 'react';
import { Form, FormEventsListener, TextField, SubmitField } from 'react-components-form';
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
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" onChangeModel={({ name, value }) => { console.log(name, value) }} label="Login" type="text" />
            </Form>
            <button onClick={() => eventsListener.callEvent('submit')}>Outside form submit button</button>
        </div>
    );
};

export default LoginForm;
```

####Example of registration form

```js
import React from 'react';
import Schema from 'form-schema-validation';
import { Form, TextField, CheckboxField, SubmitField } from 'react-components-form';

const emailValidator = () => ({
    validator(value){
        const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+(\-)?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{0,6}?\.[a-zA-Z]{2,6}$/;
        if (!value.match(regex)) {
            return false;
        }
        return true;
    },
    errorMessage: 'Inserted value is not a email adress'
});

const sameValueAs = (fieldName) => ({
    validator(value, type, model){
        return value === model[fieldName];
    },
    errorMessage: 'Reapeted password is incorrect'
});

const registrationSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validators: [emailValidator()]
    },
    phone:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true,
        validators: [sameValueAs('password')]
    },
    termsAccepted: {
        type: Boolean,
        required: true,
    }
});

const RegistrationForm  = () => (
    <Form
        schema={registrationSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h4>REGISTRATION FORM</h4>
        <TextField name="name" label="Name" type="text" />
        <TextField name="email" label="Email" type="text" />
        <TextField name="phone" label="Phone" type="text" />
        <TextField name="password" label="Password" type="password" />
        <TextField name="password2" label="Repeate password" type="password" />
        <CheckboxField name="termsAccepted" label="Accept terms" />
        <SubmitField value="Register" />
    </Form>
);

export default RegistrationForm;
```

####Example of use SelectField

```js
import React from 'react';
import { Form, SelectField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

const countrySchema = new Schema({
    country: {
        type: String,
        required: true,
    }
});

const countrys = [
    {lable:'Poland', value:'PL'},
    {lable:'Germany', value:'DE'},
    {lable:'England', value:'EN'}
];

const CompanyForm  = () => (
    <Form
        schema={countrySchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <SelectField name="country" options={countrys} label="Country" />
        <SubmitField value="Submit" />
    </Form>
);

export default CompanyForm;
```

####Example of use ObjectField

You can group fields as object by using ObjectField component.

```js
import React from 'react';
import { Form, TextField, ObjectField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

const ownerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String
    }
});

const companySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    owner: {
        type: ownerSchema,
        required: true
    }
});

const CompanyForm  = () => (
    <Form
        schema={companySchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <TextField name="title" label="Company title" />
        <ObjectField name="owner" label="Company owner">
            <TextField name="name" label="Name" />
            <TextField name="surname" label="Surname" />
        </ObjectField>
        <SubmitField value="Submit" />
    </Form>
);

export default CompanyForm;
```

####Example of use ListField

You can use ListField to create list of fields or groups of fields

```js
import React from 'react';
import { Form, TextField, ListField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String
    },
    languages: {
        type: [String]
    }
});

const MemberForm  = () => (
    <Form
        schema={memberSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <TextField name="name" label="Name" />
        <TextField name="surname" label="Surname" />
        <ListField name="languages" label="Languages">
            <TextField placeholder="language" />
        </ListField>
        <SubmitField value="Submit" />
    </Form>
);

export default MemberForm;
```

####Example of use FieldsRestyle

You can restyle all fields by FieldRestyle method

```js
import { FieldsRestyle } from 'react-components-form';
import {
    TextField,
    DateField,
    TextareaField,
    NumberField,
    SubmitField,
    SelectField,
    CheckboxField,
    ObjectField,
    ListField
} from 'react-components-form';

const fields = {
    TextField,
    DateField,
    TextareaField,
    NumberField,
    SubmitField,
    SelectField,
    CheckboxField,
    ObjectField,
    ListField
};
const errorStyles = {
    className: 'alert alert-danger'
};

const Fields = FieldsRestyle(fields, {
    TextField: {
        className: 'form-control',
        errorStyles
    },
    DateField: {
        className: 'form-control',
        errorStyles
    },
    TextareaField: {
        className: 'form-control',
        errorStyles
    },
    NumberField: {
        className: 'form-control',
        errorStyles
    },
    SubmitField: {
        className: 'btn btn-primary',
        errorStyles
    },
    SelectField: {
        className: 'form-control',
        errorStyles
    },
    CheckboxField: {
        wrapperClassName: 'checkbox',
        errorStyles
    },
    ListField: {
        className: 'form-control',
        errorStyles,
        addButton: {
            className: 'btn btn-success btn-xs'
        },
        removeButton: {
            className: 'btn btn-danger btn-xs pull-right'
        }
    }
});

export const Form = Fields.Form;
export const TextField = Fields.TextField;
export const DateField = Fields.DateField;
export const TextareaField = Fields.TextareaField;
export const NumberField = Fields.NumberField;
export const SubmitField = Fields.SubmitField;
export const SelectField = Fields.SelectField;
export const CheckboxField = Fields.CheckboxField;
export const ObjectField = Fields.ObjectField;
export const ListField = Fields.ListField;
export default Fields;
```



####Separate fields

You can use fields without Form context by import it from "react-components-form/Separate"

```js
import { TextField } from 'react-components-form/Separate';

const exampleSearchComponent = ({onSearch}) => (
    <div>
        <TextField onChange={onSearch} />
    </div>
);

export default exampleSearchComponent;
```

####Bootstrap fields

You can use fields with Bootstrap theme by import it from "react-components-form/Bootstrap"

```js
import React from 'react';
import { Form, TextField, SubmitField } from 'react-components-form/Bootstrap';
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
    login: 'TestLogin',
    password: '1234'
};

const LoginForm  = () => (
    <Form
        schema={loginSchema}
        model={model}
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