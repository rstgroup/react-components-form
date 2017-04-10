import React from 'react';
import { mount } from 'enzyme';
import {NumberField} from '../src/components/NumberField';

describe('NumberField', () => {
    it('should receive props and call onChange method on change value', () => {
        const onChangeData = (value) => {
            expect(value).toBe(12);
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
        const wrapper = mount(<NumberField {...props} />);
        wrapper.find('input').simulate('change', {target:{value: '12'}});
    });
});