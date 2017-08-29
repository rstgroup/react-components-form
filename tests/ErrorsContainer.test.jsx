import React from 'react';
import { mount } from 'enzyme';
import { ErrorsContainer } from '../src/components';
import { ErrorField } from '../src/components/separate';

describe('ErrorsContainer', () => {
    const errors = {
        name: [
            'Field required',
            'Max length > 10',
        ],
        pass: [
            'Field required',
        ],
    };
    const context = {
        getAllErrors: () => errors,
    };

    it('should prepare errors list properly', () => {
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors.length).toBe(3);
        expect(wrapper.find(ErrorField).props().errors[0]).toBe(errors.name[0]);
    });

    it('should pass ErrorComponent prop to ErrorField', () => {
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
        const wrapper = mount(<ErrorsContainer {...props} />, { context });
        expect(wrapper.find(ErrorField).props().ErrorComponent).toBe(ErrorComponent);
    });
});
