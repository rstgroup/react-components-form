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

    it('should prepare errors list properly', () => {
        const context = {
            getAllErrors: () => errors,
        };
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors.length).toBe(3);
        expect(wrapper.find(ErrorField).props().errors[0]).toBe(errors.name[0]);
    });

    it('should prepare errors list properly when example errors from ListField given', () => {
        const availableErrors = [
            'error0',
            'error1',
            'error2',
            'error3',
            'error4',
            'error5',
            'error6',
        ];
        const listFieldErrors = {
            foo: [
                {
                    bar: [
                        availableErrors[0],
                    ],
                    foo: [
                        {
                            bar: [
                                availableErrors[1],
                            ],
                        },
                    ],
                },
            ],
            bar: {
                foo: [
                    availableErrors[2],
                ],
                bar: {
                    foo: [
                        availableErrors[3],
                        [
                            availableErrors[4],
                            availableErrors[5],
                            {
                                foo: [
                                    availableErrors[6],
                                ],
                            },
                        ],
                    ],
                },
            },
        };
        const context = {
            getAllErrors: () => listFieldErrors,
        };
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors).toEqual(availableErrors);
    });

    it('should prepare errors list properly when errors data is array', () => {
        const errorsArray = [
            'error0',
            'error1',
        ];
        const context = {
            getAllErrors: () => errorsArray,
        };
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors).toEqual(errorsArray);
    });

    it('should prepare errors list properly when errors data is string', () => {
        const errorsArray = ['error0'];
        const context = {
            getAllErrors: () => errorsArray[0],
        };
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors).toEqual(errorsArray);
    });

    it('should prepare errors list properly when errors data is undefined', () => {
        const context = {
            getAllErrors: () => undefined,
        };
        const wrapper = mount(<ErrorsContainer />, { context });
        expect(wrapper.find(ErrorField).props().errors).toEqual([]);
    });

    it('should pass ErrorComponent prop to ErrorField', () => {
        const context = {
            getAllErrors: () => errors,
        };
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
