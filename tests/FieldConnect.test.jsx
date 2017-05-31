import React from 'react';
import { mount } from 'enzyme';
import {
    TextField,
    SubmitField,
    SelectField
} from '../src/components/separate';
import TextFieldWithFormConnect from '../src/components/TextField';
import SelectFieldWithFormConnect from '../src/components/SelectField';
import SubmitFieldWithFormConnect from '../src/components/SubmitField';


describe('FieldConnect', () => {
    it('should recive context from form and give props to TextField',() => {
        const context = {
            getModel: jest.fn(),
            getErrors: () => []
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            className: 'testComponent',
            value: 'testValue'
        };
        const wrapper = mount(<TextFieldWithFormConnect {...props} />, {context});
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
        const wrapper = mount(<TextFieldWithFormConnect {...props} />);
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
        const wrapper = mount(<SelectFieldWithFormConnect {...props} />);
        const field = wrapper.find(SelectField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
        expect(field.props().options).toBe(props.options);
        expect(wrapper.component.getInstance().getPath()).toBe(props.name);
    });

    it('without context from form should give props to SelectField when options are objects', () => {
        const context = {
            setModel: jest.fn(),
            getModel: jest.fn(),
            getSchema: jest.fn(),
            submitForm: jest.fn(),
            getErrors: () => []
        };
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
        const wrapper = mount(<SelectFieldWithFormConnect {...props} />, {context});
        const field = wrapper.find(SelectField);
        expect(field.props().name).toBe(props.name);
        expect(field.props().label).toBe(props.label);
        expect(field.props().options).toBe(props.options);
        expect(wrapper.component.getInstance().getPath()).toBe(props.name);
    });

    it('should give SubmitField submit method from form', () => {
        const mockMethod = jest.fn();
        const context = {
            submitForm: mockMethod
        };
        const props = {
            value: 'Submit'
        };
        const wrapper = mount(<SubmitFieldWithFormConnect {...props} />, {context});
        const field = wrapper.find(SubmitField);
        field.find('button').simulate('click');
        expect(mockMethod.mock.calls.length).toBe(1);
    });

    it('dont give SubmitField submit method from form', () => {
        const props = {
            value: 'Submit'
        };
        const wrapper = mount(<SubmitFieldWithFormConnect {...props} />);
        const field = wrapper.find(SubmitField);
        field.find('button').simulate('click');
        expect(field.props().value).toBe('Submit');
    });

    it('should update model when value is available', () => {
        const context = {
            setModel: jest.fn()
        };
        const props = {
            name: 'name',
            value: 'value'
        };
        const wrapper = mount(<TextFieldWithFormConnect {...props} />, {context});
        expect(context.setModel).toHaveBeenCalledWith(props.name, props.value);
    });

    it('should not update model when value is not available', () => {
        const context = {
            setModel: jest.fn()
        };
        const props = {
            name: 'name'
        };
        const wrapper = mount(<TextFieldWithFormConnect {...props} />, {context});
        expect(context.setModel).not.toHaveBeenCalled();
    });

    it('should update model when options is available', () => {
        const context = {
            setModel: jest.fn()
        };
        const props = {
            name: 'name',
            options: [0, 1, 2],
            defaultOption: 0
        };
        const wrapper = mount(<TextFieldWithFormConnect {...props} />, {context});
        expect(context.setModel).toHaveBeenCalledWith(props.name, props.options[0]);
    });

    it('should not update model when options is available but is empty', () => {
        const context = {
            setModel: jest.fn()
        };
        const props = {
            name: 'name',
            options: []
        };
        const wrapper = mount(<TextFieldWithFormConnect {...props} />, {context});
        expect(context.setModel).not.toHaveBeenCalled();
    });
});
