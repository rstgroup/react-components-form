import React from 'react';
import { mount } from 'enzyme';
import {
    Form,
    TextField,
    SubmitField,
    ObjectField,
    ListField,
} from '../../src/components';
import { addressFormSchema, languagesFormSchema, listSchema } from '../data/schemas';


describe('ListField', () => {
    it('should add and remove field', () => {
        const submitMethod = (data) => { expect(data.languages.length).toBe(3); };
        const addButtonProp = { className: 'addButtonClass' };
        const removeButtonProp = { className: 'removeButtonClass' };

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={languagesFormSchema}
            >
                <ListField name="languages" label="Languages" addButton={addButtonProp} removeButton={removeButtonProp}>
                    <TextField />
                </ListField>
                <SubmitField value="Submit" />
            </Form>,
        );
        wrapper.find(ListField);
        const addButton = wrapper.find('.addButtonClass').first();
        const removeButton = wrapper.find('.removeButtonClass').first();
        addButton.simulate('click');
        addButton.simulate('click');
        expect(wrapper.find(TextField).length).toBe(3);
        removeButton.simulate('click');
        expect(wrapper.find(TextField).length).toBe(2);
        wrapper.unmount();
    });

    it('should add 3 object Fields and remove second field', () => {
        const submitMock = jest.fn();
        const model = {};
        const addButtonProp = { className: 'addButtonClass' };
        const removeButtonProp = { className: 'removeButtonClass' };
        const wrapper = mount(
            <Form
                onSubmit={submitMock}
                schema={addressFormSchema}
                model={model}
            >
                <ListField
                    name="address"
                    label="Address"
                    addButton={addButtonProp}
                    removeButton={removeButtonProp}
                >
                    <ObjectField>
                        <TextField name="city" />
                        <TextField name="street" />
                        <TextField name="postCode" />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit" />
            </Form>,
        );
        const addButton = wrapper.find('.addButtonClass').first();
        const submit = wrapper.find(SubmitField);
        const setDataToObjectField = (fields, number = '') => {
            fields.find('input[name="city"]').simulate('change', { target: { value: `testCity${number}` } });
            fields.find('input[name="street"]').simulate('change', { target: { value: `testStreet${number}` } });
            fields.find('input[name="postCode"]').simulate('change', { target: { value: `testPostCode${number}` } });
        };
        addButton.simulate('click');
        addButton.simulate('click');
        addButton.simulate('click');

        expect(wrapper.find(ObjectField).length).toBe(3);

        const fieldsFromObject1 = wrapper.find(ObjectField).first().find(TextField);
        setDataToObjectField(fieldsFromObject1);
        const fieldsFromObject2 = wrapper.find(ObjectField).at(1).find(TextField);
        setDataToObjectField(fieldsFromObject2, 2);
        const fieldsFromObject3 = wrapper.find(ObjectField).at(2).find(TextField);
        setDataToObjectField(fieldsFromObject3, 3);

        const removeButtons = wrapper.find('.removeButtonClass');
        removeButtons.at(1).simulate('click');
        expect(wrapper.find(ObjectField).length).toBe(2);
        submit.find('button').simulate('click');
        expect(submitMock).toBeCalledWith({
            address: [
                {
                    city: 'testCity',
                    street: 'testStreet',
                    postCode: 'testPostCode',
                },
                {
                    city: 'testCity3',
                    street: 'testStreet3',
                    postCode: 'testPostCode3',
                },
            ],
        });
    });

    it('should hide new element button after two elements add', () => {
        const submitMethod = () => {};
        const addButton = { className: 'addButtonClass' };
        const removeButton = { className: 'removeButtonClass' };
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
                        <TextField name="testElement" className="testElement" />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit" />
            </Form>,
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
        const removeButton = { className: 'removeButtonClass' };
        const wrapper = mount(
            <Form
                schema={listSchema}
                onSubmit={submitMethod}
            >
                <ListField
                    name="testList"
                    minLength={1}
                    addButton={addButton}
                    removeButton={removeButton}
                >
                    <ObjectField>
                        <TextField name="testElement" className="testElement" />
                    </ObjectField>
                </ListField>
                <SubmitField value="Submit" />
            </Form>,
        );
        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('.removeButtonClass').length).toBe(0);
        expect(wrapper.find('input').length).toBe(1);

        wrapper.find('.addButtonClass').first().simulate('click');

        expect(wrapper.find('.addButtonClass').length).toBe(1);
        expect(wrapper.find('.removeButtonClass').length).toBe(2);
        expect(wrapper.find('input').length).toBe(2);
    });
});
