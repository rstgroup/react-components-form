# SCHEMA

Schema give you posibility to validate object using schema validation. You can defined schema and use validate method to check object. Validate method allways returns errors object but if You don't have errors object is empty so You can check errors by 
```js
const schema = new Schema({
    companyName: {
        type: String
    }
});

const modelObject = {
    companyName: 'Test Company'
};

const errors = schema.validate(modelObject); // {}
const error = Object.keys(errors).length > 0; // false
```

### Methods

| Name | Attributes | Description |
|---|---|---|
| validate | model: Object | Validate Object using defined schema |
| getDefaultValues |  | Get default values for model using defined schema |
| getField | name: String | Get field schema |
| getField |  | Get all fields schemas |

### Schema definition Example

If You want create new schema You must put object to constructor with information about object keys names and type of value on key.

```js
const schema = new Schema({
    companyName: {
        type: String,
        required: true,
        label: 'Company name'
    },
    createdAt: {
        type: Date
        defaultValue: new Date(),
        label: 'When start'
    },
    workers: {
        type: Number
        label: 'How many workers we have'
    }
});
```

#### Schema keys description

When You defined schema You can use this keys: 

| Key | Allowed values | Description |
|---|---|---|
| companyName, createdAt, workers, ... | any name | this key defined object key name |
| type | String, Number, Object, Date, Boolean, Array, instance of Schema, [String] ... | this key tell as what type of value we should have on this key in model |
| required | true, false | this key tell as that field is required |
| defaultValue | Any | You can set default value for model |
| options | Array of (String, Number, Object, Date, ...) | If you use schema for forms You can defined options for select field |
| label | Any instance of String | If you use schema for forms You can defined label for form field |
