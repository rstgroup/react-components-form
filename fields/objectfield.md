# ObjectField

---

This field give you posibility to change form model structure. You can join fields in to object.

### Example

```js
import { Form, ObjectField, TextField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <ObjectField name="address">
            <TextField name="country" />
            <TextField name="postCode" />
            <TextField name="city" />
        </ObjectField>
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "address": {
        "country": "Some country",
        "postCode": "Some post code",
        "city": "Some city",
    },
}
```

#### 



