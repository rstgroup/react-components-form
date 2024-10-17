import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectField } from '../../src/components/SelectField';

describe('SelectField', () => {
    it('should call onChange method on change value with string options', () => {
        const onChangeData = jest.fn();
        const options = ['option1', 'option2', 'option3'];
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
            options,
        };
        render(<SelectField {...props} />);
        fireEvent.change(screen.getByLabelText('first name'), { target: { value: 'option3' } });
        expect(onChangeData).toBeCalledWith('option3');
    });

    it('should call onChange method on change value with object options', () => {
        const onChangeData = jest.fn();
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName',
        };
        const options = [
            {
                label: 'Select',
                value: '',
            },
            {
                label: 'option 1',
                value: 'opt1',
            },
            {
                label: 'option 2',
                value: 'opt2',
            },
        ];
        const props = {
            name: 'options',
            label: 'Options',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: testError,
            errorStyles,
            className: 'testComponent',
            options,
        };
        render(<SelectField {...props} />);
        fireEvent.change(screen.getByLabelText('Options'), { target: { value: 'opt2' } });
        expect(onChangeData).toBeCalledWith('opt2');
    });

    it('should add disabled attribute to select option', () => {
        const testError = ['testError'];
        const errorStyles = {
            className: 'errorClassName',
        };
        const options = [
            {
                label: 'Select',
                value: '',
            },
            {
                label: 'option 1',
                value: 'opt1',
                disabled: true,
            },
            {
                label: 'option 2',
                value: 'opt2',
            },
        ];
        const props = {
            name: 'firstName',
            label: 'first name',
            onChange: () => {},
            hasValidationError: true,
            validationErrors: testError,
            errorStyles,
            className: 'testComponent',
            options,
        };
        render(<SelectField {...props} />);
        expect(screen.getByText('option 1')).toBeDisabled();
        expect(screen.getByText('option 2')).not.toBeDisabled();
    });
});
