import Schema from 'form-schema-validation';

export const addressSchema = new Schema({
    city: {
        type: String
    },
    street: {
        type: String
    },
    postCode: {
        type: String
    }
});

export const addressFormSchema = new Schema({
    address: {
        type: [addressSchema]
    }
});

export const languagesFormSchema = new Schema({
    languages: {
        type: [String]
    }
});

export const listElementSchema = new Schema({
    testElement: {
        type: String
    },
});

export const listSchema = new Schema({
    testList: {
        type: [listElementSchema]
    }
});

const personSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String
    },
});

export const resetSchema = new Schema({
    title:{
        type: String,
        label: 'Title',
        required: true
    },
    authors:{
        type: [personSchema],
        label: 'Authors'
    },
    languages:{
        type: [String]
    },
});
