import React from 'react';
import { mount } from 'enzyme';
import {TextareaField} from '../src/components/TextareaField';

describe('TextareaField', () => {
    it('should call onChange method on change value', () => {
        const onChangeData = (value) => {
            expect(value).toBe('testValue');
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
        const wrapper = mount(<TextareaField {...props} />);
        wrapper.find('textarea').simulate('change', {target:{value:'testValue'}});
    });
});