import React from 'react';
import { mount } from 'enzyme';
import { DateField } from '../../src/components/DateField';

describe('DateField', () => {
    it('should call onChange method on change value and convert value to Date object', () => {
        const date = new Date('01.01.2017');
        const date2 = new Date('12.12.2017');
        const onChangeData = jest.fn();
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: ['testError'],
            errorsStyles: {
                className: 'errorClassName'
            },
            className: 'testComponent'
        };
        const wrapper = mount(<DateField {...props} />);
        wrapper.setProps({ value: date });
        wrapper.setProps({ value: date2 });
        wrapper.find('input').simulate('change', { target: { value: '01.01.2017' } });
        expect(onChangeData).toBeCalledWith(date);
    });
});