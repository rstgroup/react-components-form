# onError

---

onError receive function that will be called when user click on submit button and form will be validated with errors.

### Attributes

errors - object reprezentation of form errors

model - object reprezentation of form structure

### Example

```js
import { Form, TextField, SubmitField } from 'react-components-form';

const errorMethod = (errors, model) => {
    //do something with errors and model when submit has errors
};

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod} onError={errorMethod}>
        <TextField name="name" />
        <TextField name="surname" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### errors structure from example

```json
{
    "name": ["Some error"],
    "surname": ["Some error"]
}
```



