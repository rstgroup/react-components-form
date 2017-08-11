# AutocompleteField

---

This field give you posibility to change form model structure by create array of fields that you can manage by "add" and "remove" buttons. You can add fields dynamic example above show you how create dynamic list of members.

### Example

```js
import { Form, SubmitField } from 'react-components-form';
import AutocompleteField from 'react-components-form/AutocompleteField';

const submitMethod = (model) => {
    //do something with model when submit success
};

const members = [
    {name: "name1", surname:"surname1", age:"1"},
    {name: "name2", surname:"surname2", age:"2"},
    {name: "name3", surname:"surname3", age:"3"},
    {name: "name4", surname:"surname4", age:"4"},
];

const TestForm = () => (
    <Form onSubmit={submitMethod}>
        <AutocompleteField
            name="username"
            options={members}
            searchKey="name"
            getValue={option => option.name}
        />
        <SubmitField value="Submit" />
    </Form>
);

export default TestForm;
```

#### model structure from example

```json
// ifwe will write "name" and we will click on "name1"
{
    "username": "name1"
}
```

#### Additional props

| Name | Type | Description |
| :--- | :--- | :--- |
| options | \[Object\], \[String\] | static options for suggestions |
| renderItem | Function | method return Node element that will be displayed in suggestions list |
| getValue | Function | getting value from selected option |
| getOptions | Function | get options for suggestions |
| searchKey | String | key that will be used for search suggestions |
| renderInputComponent | Function | return Node element of Input |
| multiSection | Boolean | flag for allow to use multisections |
| renderSectionTitle | Function | return Node that will be displayed as section title |
| getSectionSuggestions | Function | method to get suggestions for specific section |
| shouldRenderSuggestions | Boolean | flag that give posibility to render sugestions |
| suggestionsShownIfFieldEmpty | Boolean | flag that render suggestion if input field is empty |
| onSuggestionSelected | Function | method will be called on suggestions selected |
| alwaysRenderSuggestions | Boolean | allways render sugestion by default suggestions are rendered only on focus |



