import React from 'react';
import { mount } from 'enzyme';
import {TextField} from '../src/components/TextField';

describe('TextField', () => {
    it('should receive props and call onChange method on change value', () => {
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
});