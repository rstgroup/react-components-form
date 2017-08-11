# Create field

---

You can create new field by use FieldConnect method that connect your field component to Form by react context.

### Example

```js
import { FieldConnect } from 'react-components-form';

const PrefixField = ({name, value, prefix, onChange}) => (
    <div>
        <input
            name={`${prefix}.${name}`}
            value={value}
            onChange={e => onChange(`${prefix}${e.target.value}`)}
        />
    </div>
);

export default FieldConnect(PrefixField);
```



