import '../enzymeConfig';
import React from 'react';
import { mount } from 'enzyme';
import Schema from 'form-schema-validation';
import {
    Form,
    TextField,
    SubmitField,
    ObjectField,
    ListField
} from '../../src/components';
import { ObjectField as ObjectFieldSeperated } from '../../src/components/ObjectField';
import { addressFormSchema } from '../data/schemas';


describe('ObjectField', () => {
    it('should recive context from form and give props to all fields',() => {
        const submitMock = jest.fn();
        const wrapper = mount(
            <Form onSubmit={submitMock}>
                <ObjectField name="address">
                    <TextField name="city" />
                    <TextField name="street" />
                    <TextField name="postCode" />
                </ObjectField>
                <SubmitField value="Submit"/>
            </Form>
        );

        wrapper.find('input[name="city"]').simulate('change', {target: {value: 'testCity'}});
        wrapper.find('input[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        wrapper.find('input[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        wrapper.find('button').simulate('click');

        expect(submitMock).toBeCalledWith({
            address: {
                city: 'testCity',
                street: 'testStreet',
                postCode: 'testPostCode'
            }
        });
    });

    it('should recive context and schema from form and give props to all fields',() => {
        const submitMock = jest.fn();
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
                onSubmit={submitMock}
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
        wrapper.find('input[name="city"]').simulate('change', {target: {value: 'testCity'}});
        wrapper.find('input[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        wrapper.find('input[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        wrapper.find('button').simulate('click');
        expect(submitMock).toBeCalledWith({
            address: {
                city: 'testCity',
                street: 'testStreet',
                postCode: 'testPostCode',
            },
        });
    });

    it('should recive context and schema from form and give props to all fields using listField',() => {
        const submitMock = jest.fn();
        const model={};
        const wrapper = mount(
            <Form
                onSubmit={submitMock}
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
        wrapper.find('span').last().simulate('click');

        const object = wrapper.find(ObjectField);
        const submit = wrapper.find(SubmitField);

        object.find('input[name="city"]').simulate('change', {target: {value: 'testCity'}});
        object.find('input[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        object.find('input[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');

        expect(submitMock).toBeCalledWith({
            address: [
                {
                    city: 'testCity',
                    street: 'testStreet',
                    postCode: 'testPostCode',
                }
            ],
        });
    });

    it('should recive validationErrors',() => {
        const ErrorMockMethod = jest.fn();
        const submitMock = jest.fn();

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
                onSubmit={submitMock}
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
        const submit = wrapper.find(SubmitField);
        wrapper.find('input[name="street"]').simulate('change', {target: {value: 'testStreet'}});
        wrapper.find('input[name="postCode"]').simulate('change', {target: {value: 'testPostCode'}});
        submit.find('button').simulate('click');
        expect(ErrorMockMethod.mock.calls.length).toBe(1);
        expect(submitMock).not.toBeCalled();
    });

    it('should run callback only if callback is function', () => {
        const onChangeMethod = jest.fn();
        const callback = 'test';
        const field = mount(<ObjectFieldSeperated onChange={onChangeMethod} />,{context: {getSchema: () => ({})}});
        field.instance().setStateModel({test: 'test'}, callback);
        expect(onChangeMethod).toBeCalled();
    });
});