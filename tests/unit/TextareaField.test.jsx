import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
            errorStyles: {
                className: 'errorClassName',
            },
            className: 'testComponent',
        };
        render(<TextareaField {...props} />);

        const textarea = screen.getByLabelText('first name');
        fireEvent.change(textarea, { target: { value: 'testValue' } });

        expect(onChangeData).toBeCalledWith('testValue');
    });
});
