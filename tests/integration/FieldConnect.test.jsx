import '../enzymeConfig';
import React from 'react';
import { mount } from 'enzyme';
import {
    TextField,
    SubmitField,
    SelectField
} from '../../src/components/separate';
import TextFieldWithFormConnect from '../../src/components/TextField';
import SelectFieldWithFormConnect from '../../src/components/SelectField';
import SubmitFieldWithFormConnect from '../../src/components/SubmitField';
import FormContext from '../../src/components/FormContext';

const contextMount = (Component, props, context) => {
    return mount(
        <FormContext.Provider value={context}>
            <Component {...props} />
        </FormContext.Provider>
    );
};

describe('FieldConnect', () => {
    let context;
    beforeEach(() => {
        context = {
            setModel: jest.fn(),
            getModel: jest.fn(),
            getSchema: jest.fn(() => ({})),
            submitForm: jest.fn(),
            getValidationErrors: jest.fn(() => []),
            getPath: jest.fn(() => ''),
        };
    });
    it('should recive context from form and give props to TextField',() => {
        const props = {
            name: 'firstName',
            label: 'first name',
            className: 'testComponent',
            value: 'testValue'
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        const field = wrapper.find(TextField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
        field.find('input').simulate('change', 'testValue');
        expect(context.getModel).toBeCalled();
    });

    it('should give props to TextField without context from form',() => {
        const props = {
            name: 'firstName',
            label: 'first name',
            className: 'testComponent',
            value: 'testValue'
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        const field = wrapper.find(TextField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
    });

    it('without context from form should give props to SelectField', () => {
        const props = {
            name: 'selectName',
            label: 'first name',
            className: 'testComponent',
            options: ['test1', 'test2', 'test3']
        };
        const wrapper = contextMount(SelectFieldWithFormConnect, props, context);
        const componentWrapper = wrapper.find(SelectFieldWithFormConnect);
        console.log(componentWrapper.instance());
        const field = wrapper.find(SelectField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
        expect(field.props().options).toBe(props.options);
        expect(componentWrapper.instance().getPath()).toBe(props.name);
    });

    it('without context from form should give props to SelectField when options are objects', () => {
        const props = {
            name: 'selectName',
            label: 'first name',
            className: 'testComponent',
            options: [
                {label:'select', value: ''},
                {label:'test1', value: ''},
                {label:'test2', value: ''},
                {label:'test3', value: ''},
            ],
            defaultOption: 0
        };
        const wrapper = contextMount(SelectFieldWithFormConnect, props, context);
        const field = wrapper.find(SelectField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
        expect(field.props().options).toBe(props.options);
        expect(wrapper.instance().getPath()).toBe(props.name);
    });

    it('should give SubmitField submit method from form', () => {
        const props = {
            value: 'Submit'
        };
        const wrapper = contextMount(SubmitFieldWithFormConnect, props, context);
        const field = wrapper.find(SubmitField);
        field.find('button').simulate('click');
        expect(context.submitForm.mock.calls.length).toBe(1);
    });

    it('dont give SubmitField submit method from form', () => {
        const props = {
            value: 'Submit'
        };
        const wrapper = contextMount(SubmitFieldWithFormConnect, props, context);
        const field = wrapper.find(SubmitField);
        field.find('button').simulate('click');
        expect(field.props().value).toBe('Submit');
    });

    it('should update model when value is available', () => {
        const props = {
            name: 'name',
            value: 'value'
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        expect(context.setModel).toHaveBeenCalledWith(props.name, props.value);
    });

    it('should not update model when value is not available', () => {
        const props = {
            name: 'name'
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        expect(context.setModel).not.toHaveBeenCalled();
    });

    it('should update model when options is available', () => {
        const props = {
            name: 'name',
            options: [0, 1, 2],
            defaultOption: 0
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        expect(context.setModel).toHaveBeenCalledWith(props.name, props.options[0]);
    });

    it('should not update model when options is available but is empty', () => {
        const props = {
            name: 'name',
            options: []
        };
        const wrapper = contextMount(TextFieldWithFormConnect, props, context);
        expect(context.setModel).not.toHaveBeenCalled();
    });
});
