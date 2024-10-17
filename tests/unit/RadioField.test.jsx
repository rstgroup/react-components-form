import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RadioField } from '../../src/components/RadioField';

describe('RadioField', () => {
    let onChangeData = jest.fn();
    let props = {};
    beforeEach(() => {
        onChangeData = jest.fn();
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: ['testError'],
            errorStyles: {
                className: 'errorClassName',
            },
            className: 'testComponent',
            options: [
                'test1',
                'test2',
            ],
        };
    });

    it('should call onChange method on change event', () => {
        render(<RadioField {...props} />);
        fireEvent.click(screen.getByLabelText('test1'));
        expect(onChangeData).toBeCalledWith('test1');
        fireEvent.click(screen.getByLabelText('test2'));
        expect(onChangeData).toBeCalledWith('test2');
    });

    it('should render label and value if options is array of objects', () => {
        const firstLabel = 'test 1';
        const lastLabel = 'test 2';
        const fieldProps = {
            ...props,
            options: [
                { label: firstLabel, value: 'test1' },
                { label: lastLabel, value: 'test2' },
            ],
        };
        render(<RadioField {...fieldProps} />);
        expect(screen.getByLabelText(firstLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(lastLabel)).toBeInTheDocument();
    });
});
