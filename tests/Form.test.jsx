import React from 'react';
import { mount } from 'enzyme';
import Schema from 'form-schema-validation';
import {
    Form,
    TextField,
    NumberField,
    SubmitField,
    FormEventsListener
} from '../src/components';


describe('Form', () => {
    it('should run error method from props',() => {
        const loginSchema = new Schema({
            login:{
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        const mockSubmit = jest.fn();
        const mockError = jest.fn();

        const wrapper = mount(
            <Form
                schema={loginSchema}
                onError={mockError}
                onSubmit={mockSubmit}
            >
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
        );
        const fieldSubmit = wrapper.find(SubmitField);
        fieldSubmit.find('button').simulate('click');
        expect(mockError.mock.calls.length).toBe(1);
    });

    it('should have error and return undefined if dont have onError method from props',() => {
        const loginSchema = new Schema({
            login:{
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        const mockSubmit = jest.fn();

        const wrapper = mount(
            <Form
                schema={loginSchema}
                onSubmit={mockSubmit}
            >
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
        );
        const fieldSubmit = wrapper.find(SubmitField);
        fieldSubmit.find('button').simulate('click');
        expect(mockSubmit.mock.calls.length).toBe(0);
    });

    it('should run submit method from props',() => {
        const loginSchema = new Schema({
            login:{
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        const mockSubmit = jest.fn();
        const model = {
            login: 'testLogin',
            password: 'testPassword'
        };

        const wrapper = mount(
            <Form
                schema={loginSchema}
                onSubmit={mockSubmit}
                model={model}
            >
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
        );
        const fieldSubmit = wrapper.find(SubmitField);
        fieldSubmit.find('button').simulate('click');
        expect(mockSubmit.mock.calls.length).toBe(1);
    });

    it('should update model on field value change',() => {
        const wrapper = mount(
            <Form
                onSubmit={({quantity}) => expect(quantity).toBe(12)}
            >
                <NumberField name="quantity" label="Quantity" />
                <SubmitField value="Submit" />
            </Form>
        );
        const fieldSubmit = wrapper.find(SubmitField);
        const fieldQuantity = wrapper.find(NumberField);
        fieldQuantity.find('input').simulate('change', {target: {value: 12}});
        fieldSubmit.find('button').simulate('click');
    });

    it('should validate model by custom validation',() => {
        const mockCustomValidation = jest.fn();
        const wrapper = mount(
            <Form
                onSubmit={({title}) => expect(title).toBe('test')}
                customValidation={model => {mockCustomValidation(model); return {}}}
                validateOnChange
            >
                <TextField name="title" label="Title" />
            </Form>
        );
        const fieldTitle = wrapper.find(TextField);
        fieldTitle.find('input').simulate('change', {target: {value: 'test'}});
        expect(mockCustomValidation.mock.calls.length).toBe(1);
    });

    it('should submit form from eventListener',() => {
        const mockSubmit = jest.fn();
        const TestComponent = () => {
            const eventsListener = new FormEventsListener();
            return (
                <div>
                    <Form
                        onSubmit={() => mockSubmit()}
                        eventsListener={eventsListener}
                    >
                        <TextField name="title" label="Title" />
                    </Form>
                    <button className="testValidate" onClick={() => eventsListener.callEvent('validate')}>Outside validate</button>
                    <button className="testSubmit" onClick={() => eventsListener.callEvent('submit')}>Outside submit</button>
                </div>
            );
        };
        const wrapper = mount(<TestComponent />);
        const fieldTitle = wrapper.find(TextField);
        fieldTitle.find('input').simulate('change', {target: {value: 'test'}});
        wrapper.find('.testValidate').first().simulate('click');
        wrapper.find('.testSubmit').first().simulate('click');
        expect(mockSubmit.mock.calls.length).toBe(1);
    });
});