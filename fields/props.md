# Fields props

| Name | Type |
| :--- | :--- |
| name | String |
| type | String |
| value | String, Number, Object, Date, \[String\], \[Number\], \[Object\], \[Date\] |
| label | String, Node |
| placeholder | String |
| options | \[String\], \[{label: String, value: String}\] |
| defaultOption | Number |
| className | String |
| wrapperClassName | String |
| errorStyles | {className, itemClassName, fieldClassName, ErrorComponent} |
| onChangeModel | Function\(data: { name: String, value: Any }, componentInstance: FieldComponentInstance\) |
| onEmitEvents | Function\(data, componentInstance: FieldComponentInstance\) or array of functions |
| fieldAttributes | Object with html attributes for input |
| eventsListener \(from context\) | Instance of FormEventsListener \(prop avaible if you have eventListener in form\) |
| path \(from context\) | String \(this prop give you path to field "form.someObjectField.thisField"\) |
| trim \(**TextField**\) | boolean \(trims values passed to`onChange`if set\) |
| minLength \(**ListField**\) | Number \(number of minimal amount of listField elements\) |
| maxLength \(**ListField**\) | Number \(number of maximal amount of listField elements\) |
| hideAddButton \(**ListField**\) | Boolean \(you can hide add button\) |
| hideRemoveButton \(**ListField**\) | Boolean \(you can hide remove buttons\) |
| addButton \(**ListField**\) | Object \({ className: String, value: Node}\) |
| removeButton \(**ListField**\) | Object \({ className: String, value: Node}\) |



