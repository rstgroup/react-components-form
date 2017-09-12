# ListField

---

This field give you posibility to change form model structure by create array of fields that you can manage by "add" and "remove" buttons. You can add fields dynamic example above show you how create dynamic list of members.

### Example

```js
import { Form, ListField, ObjectField, TextField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <ListField name="members">
            <ObjectField>
                <TextField name="name" />
                <TextField name="surname" />
                <TextField name="age" />
            </ObjectField>
        </ListField>
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
{
    "members": [
        {
            "name": "some name",
            "surname": "some surname",
            "age": "18",
        }
    ],
}
```

#### Additional props

| Name | Type | Description |
| :--- | :--- | :--- |
| minLength | Number | Number of minimal amount of listField elements |
| maxLength | Number | Number of maximal amount of listField elements |
| hideAddButton | Boolean | Hide add button |
| hideRemoveButton  | Boolean | Hide remove button |
| addButton | Object \({ className: String, value: Node }\) | Add button custom view |
| removeButton | Object \({ className: String, value: Node }\) | Remove button custom view |



