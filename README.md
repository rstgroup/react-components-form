# REACT COMPONENTS FORM v3
[![Build Status](https://travis-ci.org/rstgroup/react-components-form.svg?branch=master)](https://travis-ci.org/rstgroup/react-components-form)
[![Coverage Status](https://coveralls.io/repos/github/rstgroup/react-components-form/badge.svg?branch=master)](https://coveralls.io/github/rstgroup/react-components-form?branch=master)
[![npm](https://img.shields.io/npm/l/react-components-form.svg)](https://npmjs.org/package/react-components-form)
[![npm](https://img.shields.io/npm/v/react-components-form.svg)](https://npmjs.org/package/react-components-form)

1. [Features](#features)
1. [Documentation](#documentation)
1. [Installation](#installation)
1. [How to use](#how-to-use)
1. [Contribute](#contribute)
1. [License](#license)

### Features

- sync validation
- async validation (Promise)
- [schema validation](https://rstgroup.gitbooks.io/react-components-form/content/form/schema.html) ([form-schema-validation](https://github.com/rstgroup/form-schema-validation))
- [custom validation methods](https://rstgroup.gitbooks.io/react-components-form/content/form/customvalidation.html)
- fields components
    - [TextField](https://rstgroup.gitbooks.io/react-components-form/content/fields/textfield.html)
    - [TextareaField](https://rstgroup.gitbooks.io/react-components-form/content/fields/textareafield.html)
    - [SelectField](https://rstgroup.gitbooks.io/react-components-form/content/fields/selectfield.html)
    - [NumberField](https://rstgroup.gitbooks.io/react-components-form/content/fields/numberfield.html)
    - RadioField
    - [CheckboxField](https://rstgroup.gitbooks.io/react-components-form/content/fields/checkboxfield.html)
    - [DateField](https://rstgroup.gitbooks.io/react-components-form/content/fields/datefield.html)
    - [AutocompleteField](https://rstgroup.gitbooks.io/react-components-form/content/fields/autocompletefield.html)
    - [ObjectField](https://rstgroup.gitbooks.io/react-components-form/content/fields/objectfield.html)
        - wrap fields to object
    - [ListField](https://rstgroup.gitbooks.io/react-components-form/content/fields/listfield.html)
        - wrap field to array
        - clone field component (array of fields)
    - [SubmitField](https://rstgroup.gitbooks.io/react-components-form/content/fields/submitfield.html) (button to submit form)
- [custom fields](https://rstgroup.gitbooks.io/react-components-form/content/fields/create-field.html) (FieldConnect)
- [FieldConnect](/documentation/FieldConnect.md)
- field can have object structure (ObjectField)
- field can have array structure (ListField)
- [FormEventsEmitter](https://rstgroup.gitbooks.io/react-components-form/content/advanced/formeventsemitter.html)
    - listen on form events
    - emit events on form
    - register custom events
- form elements (you can create component with fields and use it many times)
- FieldsRestyle (you can restyle all components)
- fields with Bootstrap styles

### Documentation

- [version ^3.0.0](https://rstgroup.gitbooks.io/react-components-form/content/)

- [version ^2.0.0](https://github.com/rstgroup/react-components-form/blob/master/documentation/README-v2.md)

### Installation

```bash
$ npm install react --save
```

```bash
$ npm install react-components-form --save
```

If you want schema validation please install [form-schema-validation](https://github.com/rstgroup/form-schema-validation)

```bash
$ npm install form-schema-validation --save
```

### How to use

```js
import React from 'react';
import { Form, TextField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

const loginSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const LoginForm = () => (
  <Form
    schema={loginSchema}
    onSubmit={model => console.log(model)}
    onError={(errors, data) => console.log('error', errors, data)}
  >
    <TextField name="login" label="Login" type="text" />
    <TextField name="password" label="Password" type="text" />
    <SubmitField value="Submit" />
  </Form>
);

export default LoginForm;
```

[<img src="https://codesandbox.io/static/img/play-codesandbox.svg" />](https://codesandbox.io/s/k54rwmlmy5?module=%2FForm.js)

### Contribute

- use eslint rules
- write clean code
- unit tests (min 85% of your code should be tested)
- [code of conduct](https://github.com/rstgroup/react-components-form/blob/master/documentation/code_of_conduct.md)

### License

react-component-form package are [MIT licensed](https://github.com/rstgroup/react-components-form/blob/master/LICENSE)