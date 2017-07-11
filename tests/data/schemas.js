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
