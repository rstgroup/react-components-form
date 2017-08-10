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

export const titleSchema = new Schema({
    title: {
        type: String,
        validators: [
            {
                validator: (value, type, model) => {
                    if (!model.title2) return !!value;
                    return true;
                },
                errorMessage: 'is required'
            },
            {
                validator: (value, type, model) => {
                    if (model.title2) return value === model.title2;
                    return true;
                },
                errorMessage: 'test error'
            }
        ]
    },
    title2: {
        type: String,
    }
});
