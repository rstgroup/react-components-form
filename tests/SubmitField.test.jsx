import React from 'react';
import { mount } from 'enzyme';
import {SubmitField} from '../src/components/SubmitField';

describe('SubmitField', () => {
    it('should receive props and call onChange method on change value', () => {
        const mockFunction = jest.fn();
        const props = {
            submit: mockFunction,
            value: 'Submit'
        };
        const wrapper = mount(<SubmitField {...props} />);
        expect(wrapper.props().value).toBe(props.value);
        expect(wrapper.props().submit).toBe(props.submit);
        wrapper.find('button').simulate('click');
        expect(mockFunction.mock.calls.length).toBe(1);
    });
});