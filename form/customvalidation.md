# customValidation

---

customValidation prop receive function that will be called on click submit button or call submit event. Before submit Form component will call this function to validate model.

### Attributes

model - object reprezentation of form structure and values

### Example

```js
import { Form, TextField, NumberField, SubmitField } from 'react-components-form';

const customValidator = (model) => {
    //validate model and return object with errors or empty object if validation success
}

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod} customValidation={customValidator}>
        <TextField name="name" />
        <TextField name="surname" />
        <NumberField name="age" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### customValidator should return on success:

```json
{}
```

#### customValidator should return on error:

```json
{
    "fieldName": ["error message"]
}
```

#### Promise support

If you want create async validation you can return Promise that will return validation results on "then".

```js
const customValidator = (model) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // some validation logic

            // on success
            resolve({});

            // on error
            resolve({
                "fieldName": ["error message"]
            });
        }, 100);
    });
}
```



