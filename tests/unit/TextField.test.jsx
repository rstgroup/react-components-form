import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextField } from '../../src/components/TextField';

describe('TextField', () => {
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
        render(<TextField {...props} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testValue' } });
        expect(onChangeData).toBeCalledWith('testValue');
    });

    it('should call onChange with trimmed value if trim flag is set', () => {
        const fakeOnChange = jest.fn();
        const fakeEvent = { target: { value: '  test value  ' } };
        render(<TextField onChange={fakeOnChange} trim />);
        fireEvent.change(screen.getByRole('textbox'), fakeEvent);
        expect(fakeOnChange).toHaveBeenCalledWith('test value');
    });
});
