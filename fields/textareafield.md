# TextareaField

---

This field is reprezentation of html textarea.

### Example

```js
import { Form, TextareaField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <TextareaField name="description" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "description": "some description from textarea",
}
```





