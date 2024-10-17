import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NumberField } from '../../src/components/NumberField';

describe('NumberField', () => {
    let props = {};
    beforeEach(() => {
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: jest.fn(),
            hasValidationError: true,
            validationErrors: ['testError'],
            errorsStyles: {
                className: 'errorClassName',
            },
            className: 'testComponent',
        };
    });

    it('should receive props and call onChange method on change value', () => {
        render(<NumberField {...props} />);
        fireEvent.change(screen.getByLabelText('first name'), { target: { value: '12' } });
        expect(props.onChange).toBeCalledWith(12);
    });

    it('should return float number on change', () => {
        props.type = 'float';
        render(<NumberField {...props} />);
        fireEvent.change(screen.getByLabelText('first name'), { target: { value: '12.21' } });
        expect(props.onChange).toBeCalledWith(12.21);
    });
});
