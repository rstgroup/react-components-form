# CheckboxField

---

This field is reprezentation of html input with type "checkbox".

### Example

```js
import { Form, CheckboxField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <CheckboxField name="isPublic" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "isPublic": false,
}
```

#### Additional props

| Name | Type | Description |
| :--- | :--- | :--- |
| checkboxValue | Any \(default: true\) | value that will be set if checkbox is checked. Default checkboxValue is true. |



