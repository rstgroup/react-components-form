import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubmitField } from '../../src/components/SubmitField';

describe('SubmitField', () => {
    it('should receive props and call submit method on button click', () => {
        const mockFunction = jest.fn();
        const props = {
            submit: mockFunction,
            value: 'Submit',
        };
        render(<SubmitField {...props} />);

        const button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(mockFunction).toHaveBeenCalledTimes(1);
    });
});
