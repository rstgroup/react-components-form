import Schema from './index';

describe('Schema', () => {
    it('should validate String and Array of String', () => {
        const schema = new Schema({
            companyName: {
                type: String,
            },
        });
        const schema2 = new Schema({
            companyName: {
                type: [String],
            },
        });
        const object = {
            companyName: 'PROSERWIT',
        };
        const object2 = {
            companyName: 12,
        };
        const object3 = {
            companyName: ['PROSERWIT', 'SEORISS'],
        };
        const object4 = {
            companyName: [11, 12],
        };
        const errors = schema.validate(object);
        const errors2 = schema.validate(object2);
        const errors3 = schema2.validate(object3);
        const errors4 = schema2.validate(object4);
        expect(Object.keys(errors).length).toBe(0);
        expect(Object.keys(errors2).length).toBe(1);
        expect(Object.keys(errors3).length).toBe(0);
        expect(Object.keys(errors4).length).toBe(1);
    });

    it('should validate Number', () => {
        const schema = new Schema({
            companyName: {
                type: Number,
            },
        });
        const object = {
            companyName: 'PROSERWIT',
        };
        const object2 = {
            companyName: 12,
        };
        const errors = schema.validate(object);
        const errors2 = schema.validate(object2);
        expect(Object.keys(errors).length).toBe(1);
        expect(Object.keys(errors2).length).toBe(0);
    });

    // it('should validate Object', () => {
    //     const companySchema = new Schema({
    //         name:{
    //             type: String
    //         }
    //     });
    //
    //     const schema = new Schema({
    //         company: {
    //             type: companySchema,
    //         },
    //     });
    //     const object = {
    //         companyName: {
    //             name: 'PROSERWIT'
    //         },
    //     };
    //     const object2 = {
    //         companyName: 'PROSERWIT',
    //     };
    //     const errors = schema.validate(object);
    //     const errors2 = schema.validate(object2);
    //
    //     expect(Object.keys(errors).length).toBe(0);
    //     expect(Object.keys(errors2).length).toBe(2);
    // })
});