import React, { Component } from 'react';
import {
    Form,
    TextField,
    TextareaField,
    NumberField,
    CheckboxField,
    SelectField,
    ObjectField,
    ListField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';
import Text from './Text';
import Textarea from './Textarea';
import Number from './Number';
import { listWrapper, objectFormField, objectFieldClassName } from '../demo.css';


const options = ['option1', 'option2', 'option3', 'option4'];

const fieldsFormSchema = new Schema({
    TextField: {
        type: String
    },
    NumberField: {
        type: Number
    },
    TextareaField: {
        type: String
    },
    SelectField: {
        type: String
    },
    CheckboxField: {
        type: Boolean
    },
    ObjectField: {
        type: new Schema({
            'ObjectField.TextField1': {
                type: String
            },
            'ObjectField.TextField2': {
                type: String
            },
            'ObjectField.TextField3': {
                type: String
            }
        })
    },
    ListField: {
        type: [new Schema({
            'ListField.TextField1': {
                type: String
            },
            'ListField.TextField2': {
                type: String
            },
            'ListField.TextField3': {
                type: String
            }
        })]
    },
});

class FieldsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    render() {
        return (
            <Form
                onSubmit={data => this.setState({data})}
                schema={fieldsFormSchema}
            >
                <Text />

                <Textarea />

                <Number />

                <SelectField name="SelectField" label="SelectField" options={options}/>
            <pre>
                {`<SelectField name="SelectField" label="SelectField" options={options} />`}
            </pre>
                <hr/>

                <CheckboxField name="CheckboxField" label="CheckboxField"/>
            <pre>
                {`<CheckboxField name="CheckboxField" label="CheckboxField" />`}
            </pre>
                <hr/>

                <ObjectField name="ObjectField">
                    <label>ObjectField</label>
                    <TextField name="ObjectField.TextField1" label="TextField1"/>
                    <TextField name="ObjectField.TextField2" label="TextField2"/>
                    <TextField name="ObjectField.TextField3" label="TextField3"/>
                </ObjectField>
            <pre>
                {`<ObjectField name="ObjectField">
    <label>ObjectField</label>
    <TextField name="ObjectField.TextField1" label="TextField1" />
    <TextField name="ObjectField.TextField2" label="TextField2" />
    <TextField name="ObjectField.TextField3" label="TextField3" />
</ObjectField>`}
            </pre>
                <hr/>

                <label>ListField</label>
                <ListField name="ListField">
                    <ObjectField>
                        <TextField name="ListField.TextField1" label="TextField1"/>
                        <TextField name="ListField.TextField2" label="TextField2"/>
                        <TextField name="ListField.TextField3" label="TextField3"/>
                    </ObjectField>
                </ListField>
            <pre>
                {`<label>ListField</label>
<ListField name="ListField">
    <ObjectField>
        <TextField name="ListField.TextField1" label="TextField1" />
        <TextField name="ListField.TextField2" label="TextField2" />
        <TextField name="ListField.TextField3" label="TextField3" />
    </ObjectField>
</ListField>`}
            </pre>
                <hr/>

                <SubmitField value="SubmitField"/>
            <pre>
                {`<SubmitField value="SubmitField" />`}
            </pre>

                <hr/>
                <label>submit results:</label>
                <pre>{JSON.stringify(this.state.data)}</pre>
            </Form>
        );
    }
}

export default FieldsForm;