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
import { ObjectField as ObjectFieldSeperated } from '../src/components/ObjectField';
import { addressFormSchema } from './data/schemas';


describe('ObjectField', () => {
    it('should recive context from form and give props to all fields',() => {
        const submitMethod = (data) => {
            expect(data.address.city).toBe('testCity');
            expect(data.address.street).toBe('testStreet');
            expect(data.address.postCode).toBe('testPostCode');
        };
        const wrapper = mount(
            <Form onSubmit={submitMethod}>
                <ObjectField name="address">
                    <TextField name="city" />
                    <TextField name="street" />
                    <TextField name="postCode" />
                </ObjectField>
                <SubmitField value="Submit"/>
            </Form>
        );
        const object = wrapper.find(ObjectField);
        const fields = object.find(TextField);
        const submit = wrapper.find(SubmitField);
        fields.find('[name="city"]').simulate('change', {target: {value: 'testCity'}});
        fields.find('[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        fields.find('[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');
    });

    it('should recive context and schema from form and give props to all fields',() => {
        const submitMethod = (data) => {
            expect(data.address.city).toBe('testCity');
            expect(data.address.street).toBe('testStreet');
            expect(data.address.postCode).toBe('testPostCode');
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
                type: addressSchema
            }
        });

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={formSchema}
            >
                <ObjectField name="address">
                    <TextField name="city" />
                    <TextField name="street" />
                    <TextField name="postCode" />
                </ObjectField>
                <SubmitField value="Submit"/>
            </Form>
        );
        const object = wrapper.find(ObjectField);
        const fields = object.find(TextField);
        const submit = wrapper.find(SubmitField);
        fields.find('[name="city"]').simulate('change', {target: {value: 'testCity'}});
        fields.find('[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        fields.find('[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');
    });

    it('should recive context and schema from form and give props to all fields using listField',() => {
        const submitMethod = (data) => {
            expect(data.address[0].city).toBe('testCity');
            expect(data.address[0].street).toBe('testStreet');
            expect(data.address[0].postCode).toBe('testPostCode');
        };
        const model={};
        const addButton = { className: 'addButtonClass' };

        const wrapper = mount(
            <Form
                onSubmit={submitMethod}
                schema={addressFormSchema}
                model={model}
            >
                <ListField name="address" label="Address">
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
        list.find('span').last().simulate('click');

        const object = list.find(ObjectField);
        const fields = object.find(TextField);
        const submit = wrapper.find(SubmitField);

        fields.find('[name="city"]').simulate('change', {target: {value: 'testCity'}});
        fields.find('[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        fields.find('[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');
    });

    it('should recive validationErrors',() => {
        const ErrorMockMethod = jest.fn();

        const addressSchema = new Schema({
            city: {
                type: String,
                required: true
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
                type: addressSchema
            }
        });

        const wrapper = mount(
            <Form
                onError={ErrorMockMethod}
                schema={formSchema}
            >
                <ObjectField name="address">
                    <TextField name="city" />
                    <TextField name="street" />
                    <TextField name="postCode" />
                </ObjectField>
                <SubmitField value="Submit"/>
            </Form>
        );
        const object = wrapper.find(ObjectField);
        const fields = object.find(TextField);
        const submit = wrapper.find(SubmitField);
        fields.find('[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        fields.find('[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');
        expect(ErrorMockMethod.mock.calls.length).toBe(1);
    });

    it('should run callback only if callback is function', () => {
        const onChangeMethod = jest.fn();
        const callback = 'test';
        const field = mount(<ObjectFieldSeperated onChange={onChangeMethod} />,{context: {getSchema: () => ({})}});
        field.instance().setStateModel({test: 'test'}, callback);
        expect(onChangeMethod).toBeCalled();
    });
});