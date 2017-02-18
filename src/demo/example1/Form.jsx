import React from 'react';
import fields,{
    Form,
    TextField,
    SelectField,
    ObjectField,
    ListField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';
import { listWrapper, objectFormField, objectFieldClassName } from '../demo.css';

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
        label: 'Title'
    },
    category:{
        type: String,
        label: 'Category'
    },
    authors:{
        type: [personSchema],
        label: 'Authors'
    },
    createdAt:{
        type: Date,
        defaultValue: new Date()
    }
});

const options = [
    {
        label: 'category 1',
        value: 'calegory 1'
    },
    {
        label: 'category 2',
        value: 'calegory 2'
    },
    {
        label: 'category 3',
        value: 'calegory 3'
    }
];

class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        return (
            <Form
                schema={postSchema}
                onSubmit={data => this.setState({data})}
                onError={(errors, data) => console.log('error', errors, data)}
                className={this.props.className}
            >
                <h2>POST FORM</h2>
                <TextField name="title" type="text" />
                <SelectField name="category" options={options} />
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
                <SubmitField value="Submit" />
                <div>
                    <h4>Saved data:</h4>
                    {JSON.stringify(this.state.data)}
                </div>
            </Form>
        );
    }
}

export default SimpleForm;