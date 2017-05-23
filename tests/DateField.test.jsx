import React from 'react';
import { mount } from 'enzyme';
import {DateField} from '../src/components/DateField';

describe('DateField', () => {
    it('should call onChange method on change value and convert value to Date object', () => {
        const onChangeData = (value) => {
            expect(value instanceof Date).toBe(true);
            expect(value.getDate()).toBe(12);
            expect(value.getMonth()).toBe(1);
            expect(value.getFullYear()).toBe(2017);
        };
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<DateField {...props} />);
        wrapper.setProps({value: new Date('01.01.2017')});
        wrapper.setProps({value: new Date('12.12.2017')});
        wrapper.find('input').simulate('change', {target:{value:'02.12.2017'}});
    });
});