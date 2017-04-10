import React from 'react';
import { mount } from 'enzyme';
import {CheckboxField} from '../src/components/CheckboxField';

describe('CheckboxField', () => {
    it('should call onChange method on change value', () => {
        const onChangeData = (value) => {
            expect(value).toBe(true);
        };
        const onChangeData2 = (value) => {
            expect(value).toBe(false);
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
        const wrapper = mount(<CheckboxField {...props} />);
        wrapper.find('input').simulate('change');
        wrapper.setProps({
            type: Boolean,
            onChange: onChangeData2
        });
        wrapper.find('input').simulate('change');
    });
});