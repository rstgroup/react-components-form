import React from 'react';
import { mount } from 'enzyme';
import {
    Form,
    TextField,
    SubmitField,
    ObjectField,
    ListField
} from '../src/components';
import { addressFormSchema, languagesFormSchema, listSchema } from './data/schemas';


describe('ListField', () => {
    it('should add and remove field',() => {
        const submitMethod = (data) => { expect(data.languages.length).toBe(3); };
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass'};

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={languagesFormSchema}
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

    it('should add 3 object Fields and remove second field',() => {
        const submitMethod = (data) => {
            expect(data.address[0].city).toBe('testCity');
            expect(data.address[0].street).toBe('testStreet');
            expect(data.address[0].postCode).toBe('testPostCode');

            expect(data.address[1].city).toBe('testCity3');
            expect(data.address[1].street).toBe('testStreet3');
            expect(data.address[1].postCode).toBe('testPostCode3');
        };

        const model={};
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass' };

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={addressFormSchema}
                model={model}
            >
                <ListField
                    name="address" 
                    label="Address"
                    addButton={addButton}
                    removeButton={removeButton}
                >
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


        const submit = wrapper.find(SubmitField);

        const setDataToObjectField = (fields, number = '') => {
            fields.find('[name="city"]').simulate('change', {target: {value: `testCity${number}`}});
            fields.find('[name="street"]').simulate('change', {target: {value: `testStreet${number}`}});
            fields.find('[name="postCode"]').simulate('change', {target: {value: `testPostCode${number}`}});
        };

        list.find('.addButtonClass').first().simulate('click');
        list.find('.addButtonClass').first().simulate('click');
        list.find('.addButtonClass').first().simulate('click');
        expect(list.find(ObjectField).length).toBe(3);

        const object = list.find(ObjectField).first();
        const fields = object.find(TextField);
        setDataToObjectField(fields);
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

    it('should hide new element button after two elements add', () => {
        const submitMethod = () => {};
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass'};
        const wrapper = mount(
            <Form
                schema={listSchema}
                onSubmit={submitMethod}
            >
                <ListField
                    name="testList"
                    maxLength={3}
                    addButton={addButton}
                    removeButton={removeButton}
                >
                    <ObjectField>
                        <TextField name='testElement' className='testElement' />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit"/>
            </Form>
        );
        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('input').length).toBe(1);

        wrapper.find('.addButtonClass').first().simulate('click');
        wrapper.find('.addButtonClass').first().simulate('click');

        expect(wrapper.find('.addButtonClass').length).toBe(0);
        expect(wrapper.find('input').length).toBe(3);
    });

    it('should show remove element button after element add', () => {
        const submitMethod = () => {};
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass'};
        const wrapper = mount(
            <Form
                schema={listSchema}
                onSubmit={submitMethod}
            >
                <ListField
                    name="testList"
                    minLength={2}
                    addButton={addButton}
                    removeButton={removeButton}
                >
                    <ObjectField>
                        <TextField name='testElement' className='testElement' />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit"/>
            </Form>
        );
        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('.removeButtonClass').length).toBe(0);
        expect(wrapper.find('input').length).toBe(1);

        wrapper.find('.addButtonClass').first().simulate('click');

        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('.removeButtonClass').length).toBe(2);
        expect(wrapper.find('input').length).toBe(2);
    });

    it("should set maxLength as minLength when it's smaller", () => {
        const submitMethod = () => {};
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass'};
        const wrapper = mount(
            <Form
                schema={listSchema}
                onSubmit={submitMethod}
            >
                <ListField
                    name="testList"
                    minLength={2}
                    maxLength={1}
                    addButton={addButton}
                    removeButton={removeButton}
                >
                    <ObjectField>
                        <TextField name='testElement' className='testElement' />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit"/>
            </Form>
        );
        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('.removeButtonClass').length).toBe(0);
        expect(wrapper.find('input').length).toBe(1);

        wrapper.find('.addButtonClass').first().simulate('click');

        expect(wrapper.find('.addButtonClass').length).toBe(0);
        expect(wrapper.find('.removeButtonClass').length).toBe(2);
        expect(wrapper.find('input').length).toBe(2);
    });
});