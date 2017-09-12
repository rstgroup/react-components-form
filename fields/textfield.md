# TextField

---

This field is reprezentation of html input with type "text".

### Example

```js
import { Form, TextField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <TextField name="name" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "name": "",
}
```

### Additional props

| Name | Type | Description |
| :--- | :--- | :--- |
| trim | Boolean | On change value it will be trim value |
| type | String | Input type |



