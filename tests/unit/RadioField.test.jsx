import React from 'react';
import { mount } from 'enzyme';
import { RadioField } from '../../src/components/RadioField';

describe('RadioField', () => {
    let onChangeData = jest.fn();
    let props = {};
    beforeEach(() => {
        onChangeData = jest.fn();
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: ['testError'],
            errorsStyles: {
                className: 'errorClassName',
            },
            className: 'testComponent',
            options: [
                'test1',
                'test2',
            ],
        };
    });

    it('should call onChange method on change event', () => {
        const wrapper = mount(<RadioField {...props} />);
        wrapper.find('input').first().simulate('change');
        expect(onChangeData).toBeCalledWith('test1');
        wrapper.find('input').at(1).simulate('change');
        expect(onChangeData).toBeCalledWith('test2');
    });

    it('should render label and value if options is array of objects', () => {
        const firstLabel = 'test 1';
        const lastLabel = 'test 2';
        const fieldProps = Object.assign({}, props, { options: [
            { label: firstLabel, value: 'test1' },
            { label: lastLabel, value: 'test2' },
        ] });
        const wrapper = mount(<RadioField {...fieldProps} />);
        expect(wrapper.contains(firstLabel)).toEqual(true);
        expect(wrapper.contains(lastLabel)).toEqual(true);
    });
});
