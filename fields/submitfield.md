# ListField

---

This field give you posibility to display submit button

### Example

```js
import { Form, TextField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <TextField name="testData" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```





