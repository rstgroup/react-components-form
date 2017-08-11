# NumberField

---

This field is reprezentation of html input with type "number".

### Example

```js
import { Form, NumberField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <NumberField name="age" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "age": 18,
}
```

### Additional props

| Name | Type | Description |
| :--- | :--- | :--- |
| type | String | You can change number type from default integer to float by use type="float" |



