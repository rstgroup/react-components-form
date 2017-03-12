import React from 'react';
import { mount } from 'enzyme';
import {ErrorField} from '../src/components/ErrorField';

describe('FieldConnect', () => {
    it('should receive props and call onChange method on change value', () => {
        class ErrorComponent extends React.Component {
            render() {
                return (
                    <div>error</div>
                );
            }
        }
        const props = {
            ErrorComponent
        };
        const wrapper = mount(<ErrorField {...props} />);
        expect(wrapper.props().ErrorComponent).toBe(ErrorComponent);
    });
});