import React from 'react';
import { render, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorsContainer } from '../../src/components';
import { ErrorField } from '../../src/components/separate';
import FormContext from '../../src/context';

describe('ErrorsContainer', () => {
    const errors = {
        name: [
            'Name field is required',
            'Max length > 10',
        ],
        pass: [
            'Pass field is required',
        ],
    };

    it('should prepare errors list properly', () => {
        const contextValue = {
            getAllValidationErrors: () => errors,
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        expect(within(errorField).getAllByRole('listitem').length).toBe(3);
        expect(within(errorField).getByText(errors.name[0])).toBeInTheDocument();
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
        const contextValue = {
            getAllValidationErrors: () => listFieldErrors,
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        availableErrors.forEach(error => {
            expect(within(errorField).getByText(error)).toBeInTheDocument();
        });
    });

    it('should prepare errors list properly when errors data is array', () => {
        const errorsArray = [
            'error0',
            'error1',
        ];
        const contextValue = {
            getAllValidationErrors: () => errorsArray,
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        errorsArray.forEach(error => {
            expect(within(errorField).getByText(error)).toBeInTheDocument();
        });
    });

    it('should prepare errors list properly when errors data is string', () => {
        const errorsArray = ['error0'];
        const contextValue = {
            getAllValidationErrors: () => errorsArray[0],
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        expect(within(errorField).getByText(errorsArray[0])).toBeInTheDocument();
    });

    it('should prepare errors list properly when errors data is undefined', () => {
        const contextValue = {
            getAllValidationErrors: () => undefined,
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        expect(within(errorField).queryAllByRole('listitem').length).toBe(0);
    });

    it('should pass ErrorComponent prop to ErrorField', () => {
        const contextValue = {
            getAllValidationErrors: () => errors,
        };
        const ErrorComponent = () => (
            <div>error</div>
        );
        const props = {
            ErrorComponent,
        };
        render(
            <FormContext.Provider value={contextValue}>
                <ErrorsContainer {...props} />
            </FormContext.Provider>
        );
        const errorField = screen.getByTestId('error-field');
        expect(within(errorField).getByText('error')).toBeInTheDocument();
    });
});
