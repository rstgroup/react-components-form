import Schema from 'form-schema-validation';
import cloneDeep from "lodash/cloneDeep";
import Form from '../../Form.jsx';
import ObjectField from '../../ObjectField.jsx';
import ListField from '../../ListField.jsx';
import { TextField } from '../components/Text.field.jsx';
import { SubmitField } from '../components/Submit.field.jsx';
import '../demo.css';
import FormEventsEmitter from '../../FormEventsEmitter.js';

const options = [
    {
        label: 'Sci fi',
        value: 'scifi',
    },
    {
        label: 'Horror',
        value: 'horror',
    },
    {
        label: 'Romans',
        value: 'romans',
    },
];

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        validators: [
            {
                validator: (value) => {
                    if (value.length < 3) {
                        return 'personError';
                    }
                    return true;
                },
            },
        ],
    },
    surname: {
        type: String,
    },
    age: {
        type: String,
        options: [
            {
                label: 'Select age range',
                value: '',
            },
            {
                label: '18-21',
                value: '18-21',
            },
            {
                label: '22-28',
                value: '22-28',
            },
            {
                label: '29-40',
                value: '29-40',
            },
        ],
    },
});

const postSchema = new Schema({
    title: {
        type: String,
        label: 'Title',
        required: true,
    },
    category: {
        type: String,
        label: 'Category',
        options,
    },
    authors: {
        type: [personSchema],
        label: 'Authors',
    },
    published: {
        type: Boolean,
        label: 'Published',
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
    languages: {
        type: [String],
    },
});
const resetModel = {
    title: 'test',
    category: 'horror',
    authors: [
        {
            name: 'Tester',
            surname: 'Testowy',
            age: '18-21',
        },
    ],
    languages: ['test'],
    status: true,
};

const addButton = {
    className: 'addButton',
    value: "Add",
};

const removeButton = {
    className: 'removeButton',
    value: "Remove",
};

const eventsEmitter = new FormEventsEmitter();
const BookForm = () => (
    <Form
        id="BookForm"
        schema={postSchema}
        onSubmit={data => console.log(data)}
        onError={(validationErrors, data) => console.log('error', validationErrors, data)}
        eventsEmitter={eventsEmitter}
    >
        <TextField name="title" type="text" />
        <TextField name="category" />
        <ListField
            name="authors"
            className="listWrapper"
            addButton={addButton}
            removeButton={removeButton}
            minLength={1}
        >
            <ObjectField wrapperClassName="objectFieldClassName">
                <div className="objectFormField">
                    <TextField name="name" placeholder="name" />
                </div>
                <div className={'objectFormField'}>
                    <TextField name="surname" placeholder="surname" />
                </div>
                <div>
                    <TextField name="age" />
                </div>
            </ObjectField>
        </ListField>
        <ListField name="languages" label="Languages" className="listWrapper" addButton={addButton} removeButton={removeButton}>
            <TextField placeholder="language" />
        </ListField>
        <hr/>
        <div className="footbar">
            <SubmitField value="Submit" className="addButton" />
            <button onClick={() => { eventsEmitter.emit('reset', cloneDeep(resetModel)); }} className="defaultButton">RESET</button>
        </div>
    </Form>
);

export default BookForm;
