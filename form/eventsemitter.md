# eventsEmitter

---

eventsEmitter prop receive instance of FormEventsEmitter. eventsEmitter give you posibility to call events outside form and register listeners. You can register listener on event "modelChange" and your listener will be called on all model changes.

#### Default events names:

* changeModel
* submit
* validate
* reset

### Example

```js
import { Form, TextField, NumberField, SubmitField, FormEventsEmitter } from 'react-components-form';

const eventsEmitter = new FormEventsEmitter();

const changeModelListener = (data) => {
    //do something with data when model will change
}

eventsEmitter.listen('changeModel', changeModelListener);

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod} eventsEmitter={eventsEmitter}>
        <TextField name="name" />
        <TextField name="surname" />
        <NumberField name="age" />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### changeModelListener attributes:

```json
{
    "data": {
        "name": "form.name",
        "value": "some name"
    }
}
```


