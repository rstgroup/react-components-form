# SelectField

---

This field is reprezentation of html select.

### Example

```js
import { Form, SelectField, SubmitField } from 'react-components-form';

const submitMethod = (model) => {
    //do something with model when submit success
};

const options = [
    {label: "Option 1", value: "opt1"},
    {label: "Option 2", value: "opt2"},
    {label: "Option 3", value: "opt3"},
];

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <SelectField name="category" options={options} />
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
| options | \[{ label: String, value: String }\], \[String\] | Select options list. You can use array of strings or array of objects with "label" and "value" key. |



