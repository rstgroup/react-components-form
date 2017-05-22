import React from 'react';
import { mount } from 'enzyme';
import {TextField} from '../src/components/TextField';

describe('TextField', () => {
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
        const wrapper = mount(<TextField {...props} />);
        wrapper.setProps({type: 'number'});
        wrapper.find('input').simulate('change', {target:{value:'testValue'}});
    });

    it('should call onChange with trimmed value if trim flag is set', () => {
        const fakeOnChange = jest.fn();
        const fakeEvent = { target: { value: '  test value  ' } };
        const wrapper = mount(<TextField onChange={fakeOnChange} trim />);

        wrapper.find('input').simulate('change', fakeEvent);

        expect(fakeOnChange).toHaveBeenCalledWith('test value');
    })
});
