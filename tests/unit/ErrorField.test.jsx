import React from 'react';
import { mount } from 'enzyme';
import { ErrorField } from '../../src/components/ErrorField';

describe('ErrorField', () => {
    it('should receive props and display errors in custom ErrorComponent', () => {
        const ErrorComponent = () => (
            <div>error</div>
        );
        const props = {
            ErrorComponent,
        };
        const wrapper = mount(<ErrorField {...props} />);
        expect(wrapper.props().ErrorComponent).toBe(ErrorComponent);
    });

    it('should convert "props.erros" to array if not array', () => {
        const props = {
            errors: 'string error',
        };
        const wrapper = mount(<ErrorField {...props} />);
        expect(wrapper.props().errors).toBe(props.errors);
    });
});
