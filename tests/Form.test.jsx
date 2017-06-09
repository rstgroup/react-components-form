import React from 'react';
import { mount } from 'enzyme';
import Schema from 'form-schema-validation';
import {
    Form,
    TextField,
    NumberField,
    SubmitField,
    ObjectField,
    FormEventsListener
} from '../src/components';


describe('Form', () => {
    jest.useFakeTimers();

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

    it('should support promise validation', (done) => {
        const asyncValidator = () => ({
            validator(value) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(value === 'test');
                    },100);
                });
            },
            errorMessage: `async validation failed`
        });

        const loginSchema = new Schema({
            login:{
                type: String,
                validators: [asyncValidator()]
            },
            password: {
                type: String
            }
        });

        const onSubmit = (model) => {};
        const onError = (errors) => {
            expect(errors.login[0]).toBe('async validation failed');
            done();
        };

        const wrapper = mount(
            <Form
                schema={loginSchema}
                onError={onError}
                onSubmit={onSubmit}
            >
                <TextField name="login" label="Login" type="text" />
                <TextField name="password" label="Password" type="text" />
                <SubmitField value="Login" />
            </Form>
        );
        const fieldSubmit = wrapper.find(SubmitField);
        const loginField = wrapper.find(TextField).first();
        loginField.find('input').simulate('change', { target: {value: 'test2'} });
        fieldSubmit.find('button').simulate('click');
        jest.runOnlyPendingTimers();

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

        mockSubmit.mockClear();

        const formComponent = wrapper.find(Form);
        formComponent.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
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

    it('should submit form from eventListener and run onModelChangeListeners',() => {
        const mockSubmit = jest.fn();
        const mockOnChangeModel = jest.fn();
        const onChangeModel = ({ name, value }, componentInstance) => {
            expect(name).toBe('form.title');
            expect(value).toBe('test');
            expect(componentInstance.getPath()).toBe('form.description');
            mockOnChangeModel();
        };
        const eventsListener = new FormEventsListener();
        const TestComponent = () => {
            return (
                <div>
                    <Form
                        onSubmit={() => mockSubmit()}
                        eventsListener={eventsListener}
                    >
                        <TextField name="title" label="Title" />
                        <TextField
                            name="description"
                            label="Description"
                            onChangeModel={onChangeModel}
                        />
                    </Form>
                    <button className="testValidate" onClick={() => eventsListener.callEvent('validate')}>Outside validate</button>
                    <button className="testSubmit" onClick={() => eventsListener.callEvent('submit')}>Outside submit</button>
                </div>
            );
        };
        const wrapper = mount(<TestComponent />);
        const fieldTitle = wrapper.find(TextField);
        fieldTitle.find('input').first().simulate('change', {target: {value: 'test'}});
        wrapper.find('.testValidate').first().simulate('click');
        wrapper.find('.testSubmit').first().simulate('click');
        expect(mockSubmit.mock.calls.length).toBe(1);
        expect(mockOnChangeModel.mock.calls.length).toBe(1);
        wrapper.unmount();
        expect(eventsListener.eventsListeners.changeModel.length).toBe(0);
    });

    it('should submit form by default form submit',() => {
        const mockSubmit = jest.fn();
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
            >
                <TextField name="title" label="Title" />
            </Form>
        );
        const formElement = wrapper.find('form');
        formElement.simulate('submit');
        wrapper.unmount();
        expect(mockSubmit).toBeCalled();
    });

    it('should display subform without form tag',() => {
        const mockSubmit = jest.fn();
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
                subform
            >
                <TextField name="title" label="Title" />
            </Form>
        );
        const formElement = wrapper.find('form');
        expect(formElement.length).toBe(0);
    });

    it('should reset form by FormEventsListener',() => {
        const mockSubmit = jest.fn();
        const eventListener = new FormEventsListener();
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
                eventsListener={eventListener}
            >
                <TextField name="title" label="Title" />
            </Form>
        );
        const titleField = wrapper.find(TextField);
        titleField.find('input').first().simulate('change', {target: {value: 'test'}});
        eventListener.callEvent('reset');
        eventListener.callEvent('submit');
        wrapper.unmount();
        expect(mockSubmit).toBeCalledWith({});
    });

    it('should reset form by FormEventsListener with new model',() => {
        const mockSubmit = jest.fn();
        const eventListener = new FormEventsListener();
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
                eventsListener={eventListener}
            >
                <TextField name="title" label="Title" />
            </Form>
        );
        const titleField = wrapper.find(TextField);
        titleField.find('input').first().simulate('change', {target: {value: 'test'}});
        eventListener.callEvent('reset', {title: 'new'});
        eventListener.callEvent('submit');
        expect(mockSubmit).toBeCalledWith({title: 'new'});
    });
    it('should register changeModel listener and call it on change model',() => {
        const mockListener = jest.fn();
        const eventListener = new FormEventsListener();
        const wrapper = mount(
            <Form
                onSubmit={()=>{}}
                eventsListener={eventListener}
            >
                <TextField
                    name="title"
                    label="Title"
                    onChangeModel={mockListener}
                />
                <ObjectField name="testObjectField">
                    <TextField name="test"/>
                </ObjectField>
            </Form>
        );

        wrapper.find(ObjectField)
                .find(TextField)
                .find('input')
                .first()
                .simulate('change', {target: { value: 'test' } });

        expect(mockListener).toHaveBeenCalledTimes(2);
    });

    it('should register one listener of any type of event on field',() => {
        const mockSubmit = jest.fn();
        const mockListener = jest.fn();
        const eventListener = new FormEventsListener();
        eventListener.registerEvent('test');
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
                eventsListener={eventListener}
            >
                <TextField
                    name="title"
                    label="Title"
                    onEmitEvents={{name: 'test', method: mockListener}}
                />
            </Form>
        );
        eventListener.callEvent('test', {title: 'new'});
        wrapper.unmount();
        expect(mockListener).toBeCalled();
    });

    it('should register 3 listener of any type of event on field',() => {
        const mockSubmit = jest.fn();
        const mockListener = jest.fn();
        const mockListener2 = jest.fn();
        const mockListener3 = jest.fn();
        const eventListener = new FormEventsListener();
        eventListener.registerEvent('test');
        eventListener.registerEvent('test2');
        eventListener.registerEvent('test3');
        const wrapper = mount(
            <Form
                onSubmit={mockSubmit}
                eventsListener={eventListener}
            >
                <TextField
                    name="title"
                    label="Title"
                    onEmitEvents={[
                        {name: 'test', method: mockListener},
                        {name: 'test2', method: mockListener2},
                        {name: 'test3', method: mockListener3}
                    ]}
                />
            </Form>
        );
        eventListener.callEvent('test', {title: 'new'});
        eventListener.callEvent('test2', {title: 'new2'});
        eventListener.callEvent('test3', {title: 'new3'});
        wrapper.unmount();
        expect(mockListener).toBeCalled();
        expect(mockListener2).toBeCalled();
        expect(mockListener3).toBeCalled();
    });
});
