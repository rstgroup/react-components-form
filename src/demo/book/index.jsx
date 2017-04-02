import React from 'react';
import {
    Form,
    TextField,
    CheckboxField,
    SelectField,
    ObjectField,
    ListField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';
import { listWrapper, objectFormField, objectFieldClassName } from '../demo.css';
import { FormEventsListener } from '../../components';

const options = [
    {
        label: 'Sci fi',
        value: 'scifi'
    },
    {
        label: 'Horror',
        value: 'horror'
    },
    {
        label: 'Romans',
        value: 'romans'
    }
];

const personSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String
    }
});

const postSchema = new Schema({
    title:{
        type: String,
        label: 'Title',
        required: true
    },
    category:{
        type: String,
        label: 'Category',
        options: options
    },
    authors:{
        type: [personSchema],
        label: 'Authors'
    },
    published:{
        type: Boolean,
        label: 'Published'
    },
    createdAt:{
        type: Date,
        defaultValue: new Date()
    },
    languages:{
        type: [String]
    },
    status:{
        type: Boolean
    }
});

const eventsListener = new FormEventsListener();
const BookForm = () => (
    <Form
        schema={postSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
        eventsListener={eventsListener}
    >
        <h4>BOOK FORM</h4>
        <TextField name="title" type="text" />
        <SelectField name="category" />
        <ListField name="authors" className={listWrapper}>
            <ObjectField wrapperClassName={objectFieldClassName}>
                <div className={objectFormField}>
                    <TextField name="name" placeholder="name"/>
                </div>
                <div>
                    <TextField name="surname" placeholder="surname"/>
                </div>
            </ObjectField>
        </ListField>
        <ListField name="languages" label="Languages" className={listWrapper}>
            <TextField placeholder="language" />
        </ListField>
        <CheckboxField name="status" label="Published" />
        <SubmitField value="Submit" />
    </Form>
);

export default BookForm;