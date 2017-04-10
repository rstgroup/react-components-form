import React from 'react';
import { mount } from 'enzyme';
import {SelectField} from '../src/components/SelectField';

describe('SelectField', () => {
    it('should call onChange method on change value with string options', () => {
        const onChangeData = (value) => {
            expect(value).toBe('option3');
        };
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const options = ['option1', 'option2', 'option3'];
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent'
        };
        const wrapper = mount(<SelectField {...props} />);
        wrapper.setProps({options});
        wrapper.find('select').simulate('change', {target:{value:'option3'}});
    });

    it('should call onChange method on change value with object options', () => {
        const onChangeData = (value) => {
            expect(value).toBe('opt2');
        };
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName'
        };
        const options = [
            {
                label: 'Select',
                value: ''
            },
            {
                label: 'option 1',
                value: 'opt1'
            },
            {
                label: 'option 2',
                value: 'opt2'
            }
        ];
        const props = {
            name: 'options',
            label: 'Options',
            onChange: onChangeData,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent',
            options
        };
        const wrapper = mount(<SelectField {...props} />);
        wrapper.find('select').simulate('change', {target:{value:'opt2'}});
    });
});