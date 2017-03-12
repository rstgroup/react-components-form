import React from 'react';
import { mount } from 'enzyme';
import {DateField} from '../src/components/DateField';

describe('DateField', () => {
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
});