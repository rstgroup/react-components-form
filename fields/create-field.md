# Create field

---

You can create new field by use FieldConnect method that connect your field component to Form by react context.

#### Required props

* value
* onChange
* error
* errors
* errorsStyles

### Example

Example of length field that will be return object with value and unit:

`{ value: String, unit: String } `

```js
import { FieldConnect, ErrorField } from 'react-components-form';

const LengthField = ({ name, value, unit, onChange, error, errors, errorsStyles }) => (
    <div>
        <input
            name={name}
            value={value.value}
            onChange={e => onChange({ value: e.target.value, unit})}
        />
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

export default FieldConnect(PrefixField);
```



