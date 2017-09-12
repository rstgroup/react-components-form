# DateField

---

This field is reprezentation of html 5 input with type "date".

### Example

```js
import { Form, DateField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <DateField name="timeCreated" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "description": DateObject,
}
```



