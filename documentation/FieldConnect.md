# FieldConnect

FieldConnect is HOC for create fields connected to Form component or other components connected to Form.

### Props

| Name | Attributes | Description |
|---|---|---|
| validator | validator: Function(fieldValue) | Field validator |
| value | value: Any | Field default value |
| name | name: String | Field name |
| callbacks | callbacks: { onChange: Function(value), onError: Function(value), onFocus: Function(value), onBlur: Function(value) } | Callbacks for fields |
| onModelChange | Function(model) | Callback on emit model change event |
| onEmitEvents | listeners: [{ name: String, method: Function(data) }] | Callbacks on emit events |

### Context

| Name | Attributes | Description |
|---|---|---|
| getSchema |  | Get field schema |
| getPath |  | Get field path |
| setFieldValidator | validator: Function(modelValue, fieldValue) | Register field validator |
| removeFieldValidator | validator: Function(modelValue, fieldValue) | Unregister field validator |
