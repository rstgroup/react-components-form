# onSubmit

---

onSubmit receive function that will be called when user click on submit button and form will be validated with success.

### Attributes

model - object reprezentation of form structure

### Example of use

```js
import { Form, TextField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <TextField name="name" />
        <TextField name="surname" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;

```

#### model structure from example

```json
{
    "name": "",
    "surname": ""
}
```



