import Schema from 'form-schema-validation';

const users = [
    {
        label: 'Select user',
        value: ''
    },
    {
        label: 'Jacki',
        value: '1'
    },
    {
        label: 'Max',
        value: '2'
    },
    {
        label: 'Joseph',
        value: '3'
    }
];

const services = [
    {
        label: 'Select service',
        value: ''
    },
    {
        label: 'Cleaning',
        value: '1'
    },
    {
        label: 'Cooking',
        value: '2'
    },
    {
        label: 'Health care',
        value: '3'
    }
];

const clientSchema = new Schema({
    phone:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    email:{
        type: String
    }
});

const appointmentSchema = new Schema({
    date:{
        type: Date,
        required: true,
        defaultValue: new Date()
    },
    time:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    client:{
        type: clientSchema,
        required: true
    },
    userId:{
        type: String,
        required: true,
        options: users
    },
    serviceId:{
        type: String,
        required: true,
        options: services
    },
    place:{
        type: String
    },
});

export default appointmentSchema;