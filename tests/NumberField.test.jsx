import React from 'react';
import { mount } from 'enzyme';
import {NumberField} from '../src/components/NumberField';

describe('NumberField', () => {
    let props = {};
    beforeEach(() => {
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: jest.fn(),
            error: true,
            errors: ['testError'],
            errorsStyles: {
                className: 'errorClassName'
            },
            className: 'testComponent'
        };
    });
    it('should receive props and call onChange method on change value', () => {
        const wrapper = mount(<NumberField {...props} />);
        wrapper.find('input').simulate('change', {target:{value: '12'}});
        expect(props.onChange).toBeCalledWith(12)
    });
    it('should return float number on change', () => {
        props.type = 'float';
        const wrapper = mount(<NumberField {...props} />);
        wrapper.find('input').simulate('change', {target:{value: '12.21'}});
        expect(props.onChange).toBeCalledWith(12.21)
    });
});