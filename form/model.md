# model

---

model prop is object representation of form structure. Form will automatic propagation model data to fields that match to model keys.

### Example of use

```js
import { Form, TextField, SubmitField } from 'react-components-form';

const user = {
    name: "Max",
    surname: "Payn"
};

const submitMethod = (model) => {
    //do something with model
};

const TestForm = () => (
    <Form onSubmit={submitMethod} model={user}>
        <TextField name="name" />
        <TextField name="surname" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;

```

#### model structure recived in submitMethod on submit form

```json
{
    "name": "Max",
    "surname": "Payn"
}
```



