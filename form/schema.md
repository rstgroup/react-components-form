# schema

---

schema prop is instance of Schema from "[form-schema-validation](https://github.com/mprzodala/form-schema-validation)". Schema give you posibility to validate model structure and values. You can validate model by types and set fields as required or write your own validators for fields.

### Example of use

```js
import { Form, TextField, NumberField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

const testSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String
    }
    age: {
        type: Number,
        validators: [
            {
                validator: (value) => {
                    //do something with field value and return true or false
                },
                errorMessage: 'some error message'
            }
        ]
    }
});

const submitMethod = (model) => {
    //do something with model
};

const TestForm = () => (
    <Form onSubmit={submitMethod} schema={testSchema}>
        <TextField name="name" />
        <TextField name="surname" />
        <NumberField name="age" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```



