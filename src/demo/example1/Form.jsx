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

console.log(TextField);

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
                <TextField name="title" type="text" />
                <SelectField name="category" options={options} />
                <ListField name="authors">
                    <ObjectField>
                        <TextField name="name" />
                        <TextField name="surname" />
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