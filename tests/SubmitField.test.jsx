import React from 'react';
import { mount } from 'enzyme';
import {SelectField} from '../src/components/SelectField';

describe('SelectField', () => {
    it('should receive props and call onChange method on change value', () => {
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
            className: 'testComponent'
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
});