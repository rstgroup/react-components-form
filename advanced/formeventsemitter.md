# FormEventsListener

---

This class give posibility to listen on form event and emit events that will be call in form or fields.

#### Default form events names:

* changeModel - event is called when some field has changes
* submit - you can call this event to submit form. Form has registred listener for handle submit.
* validate - you can call this event to validate form. Form has registred listener for handle validate.
* reset - you can call this event to validate form. Form has registred listener for handle reset

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

### Methods

| Name | Attributes | Description |
| :--- | :--- | :--- |
| listen | eventName: String, listener: Function | Register method that will be called on emit event |
| unlisten | eventName: String, listener: Function | Unregister method that will be called on emit event |
| emit | eventName: String, data: Any | Emit event |



