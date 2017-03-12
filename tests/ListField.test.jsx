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
    });
});