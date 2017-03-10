import React from 'react';
import { mount } from 'enzyme';
import {
    TextField,
    TextareaField,
    NumberField,
    SubmitField,
    SelectField,
    CheckboxField,
    DateField,
    ErrorField
} from '../src/components/separate';

import TextFieldWithFormConnect from '../src/components/TextField';
import SelectFieldWithFormConnect from '../src/components/SelectField';
import SubmitFieldWithFormConnect from '../src/components/SubmitField';

describe('Fields', () => {

    it('TextField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<TextField {...props} />);
        expect(wrapper.props().type).toBe(props.type);
        wrapper.setProps({type: 'number'});
        expect(wrapper.props().type).toBe('number');
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.find('input').simulate('change', 'testValue');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('FieldConnect should recive context from form and give props to TextField',() => {
        const context = {
            setModel: jest.fn(),
            getModel: jest.fn(),
            getSchema: jest.fn(),
            submitForm: jest.fn(),
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
        expect(context.getModel.mock.calls.length).toBe(1);
    });

    it('FieldConnect without context from form should give props to SelectField',() => {

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
        field.find('select').simulate('change', 'test3');
    });

    it('FieldConnect should give SubmitField submit method from form', () => {
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

    it('FieldConnect dont give SubmitField submit method from form', () => {
        const props = {
            value: 'Submit'
        };
        const wrapper = mount(<SubmitFieldWithFormConnect {...props} />);
        const field = wrapper.find(SubmitField);
        field.find('button').simulate('click');
        expect(field.props().value).toBe('Submit');
    });

    it('TextareaField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<TextareaField {...props} />);
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.find('textarea').simulate('change', 'testValue');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('NumberField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<NumberField {...props} />);
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.find('input').simulate('change', 12);
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('SelectField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const options = ['option1', 'option2', 'option3'];
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent',
            // options
        };
        const wrapper = mount(<SelectField {...props} />);
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.setProps({options});
        expect(wrapper.props().options).toBe(options);
        wrapper.find('select').simulate('change', 'option3');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('SubmitField should run submit method on click button', () => {
        const mockFunction = jest.fn();
        const props = {
            submit: mockFunction,
            value: 'Submit'
        };
        const wrapper = mount(<SubmitField {...props} />);
        expect(wrapper.props().value).toBe(props.value);
        expect(wrapper.props().submit).toBe(props.submit);
        wrapper.find('button').simulate('click');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('DateField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<DateField {...props} />);
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.setProps({value: new Date('01.01.2017')});
        wrapper.setProps({value: new Date('12.12.2017')});
        wrapper.find('input').simulate('change', '01.02.2017');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('CheckboxField should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<CheckboxField {...props} />);
        expect(wrapper.props().name).toBe(props.name);
        expect(wrapper.props().label).toBe(props.label);
        expect(wrapper.props().onChange).toBe(props.onChange);
        expect(wrapper.props().error).toBe(props.error);
        expect(wrapper.props().errors).toBe(props.errors);
        wrapper.find('input').simulate('change');
        wrapper.setProps({type: Boolean});
        wrapper.find('input').simulate('change');
        expect(mockFunction.mock.calls.length).toBe(2);
    });

    it('ErrorField should receive props and display errors', () => {
        class ErrorComponent extends React.Component {
            render() {
                return (
                    <div>error</div>
                );
            }
        }
        const props = {
            ErrorComponent
        };
        const wrapper = mount(<ErrorField {...props} />);
        expect(wrapper.props().ErrorComponent).toBe(ErrorComponent);
    });
});