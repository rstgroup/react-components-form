import React from 'react';
import { mount } from 'enzyme';
import Schema from 'form-schema-validation';
import {
    Form,
    TextField,
    SubmitField,
    ObjectField,
    ListField
} from '../src/components';


describe('ListField', () => {
    it('should add and remove field',() => {
        const submitMethod = (data) => {
            expect(data.languages.length).toBe(3);
        };

        const formSchema = new Schema({
            languages: {
                type: [String]
            }
        });

        const addButton = {
            className: 'addButtonClass'
        };

        const removeButton = {
            className: 'removeButtonClass'
        };

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={formSchema}
            >
                <ListField name="languages" label="Languages" addButton={addButton} removeButton={removeButton}>
                    <TextField />
                </ListField>
                <SubmitField value="Submit"/>
            </Form>
        );
        const list = wrapper.find(ListField);
        list.find('.addButtonClass').simulate('click');
        list.find('.addButtonClass').simulate('click');
        expect(list.find(TextField).length).toBe(3);
        list.find('.removeButtonClass').first().simulate('click');
        expect(list.find(TextField).length).toBe(2);
        wrapper.unmount();
    });

    it('should add 3 object Fields and remove secound field',() => {
        const submitMethod = (data) => {
            expect(data.address[0].city).toBe('testCity');
            expect(data.address[0].street).toBe('testStreet');
            expect(data.address[0].postCode).toBe('testPostCode');

            expect(data.address[1].city).toBe('testCity3');
            expect(data.address[1].street).toBe('testStreet3');
            expect(data.address[1].postCode).toBe('testPostCode3');
        };

        const addressSchema = new Schema({
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

        const formSchema = new Schema({
            address: {
                type: [addressSchema]
            }
        });

        const model={};

        const addButton = {
            className: 'addButtonClass'
        };

        const removeButton = {
            className: 'removeButtonClass'
        };

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={formSchema}
                model={model}
            >
                <ListField name="address" label="Address" addButton={addButton} removeButton={removeButton}>
                    <ObjectField>
                        <TextField name="city" />
                        <TextField name="street" />
                        <TextField name="postCode" />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit"/>
            </Form>
        );
        const list = wrapper.find(ListField);
        const object = list.find(ObjectField).first();
        const fields = object.find(TextField);
        const submit = wrapper.find(SubmitField);

        const setDataToObjectField = (fields, number = '') => {
            fields.find('[name="city"]').simulate('change', {target: {value: `testCity${number}`}});
            fields.find('[name="street"]').simulate('change', {target: {value: `testStreet${number}`}});
            fields.find('[name="postCode"]').simulate('change', {target: {value: `testPostCode${number}`}});
        };
        setDataToObjectField(fields);
        list.find('.addButtonClass').first().simulate('click');
        list.find('.addButtonClass').first().simulate('click');
        expect(list.find(ObjectField).length).toBe(3);

        const object2 = list.find(ObjectField).at(1);
        const fields2 = object2.find(TextField);
        setDataToObjectField(fields2, 2);
        const object3 = list.find(ObjectField).at(2);
        const fields3 = object3.find(TextField);
        setDataToObjectField(fields3, 3);
        list.find('.removeButtonClass').at(1).simulate('click');
        expect(list.find(ObjectField).length).toBe(2);
        submit.find('button').simulate('click');
    });
});