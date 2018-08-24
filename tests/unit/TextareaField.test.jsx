import React from 'react';
import { mount } from 'enzyme';
import { TextareaField } from '../../src/components/TextareaField';

describe('TextareaField', () => {
    it('should call onChange method on change value', () => {
        const onChangeData = jest.fn();
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: ['testError'],
            errorsStyles: {
                className: 'errorClassName',
            },
            className: 'testComponent',
        };
        const wrapper = mount(<TextareaField {...props} />);
        wrapper.find('textarea').simulate('change', { target: { value: 'testValue' } });
        expect(onChangeData).toBeCalledWith('testValue');
    });
});
