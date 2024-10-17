import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '../../src/components/TextField';
import fieldsRestyle from '../../src/components/FieldsRestyle';

describe('FieldsRestyle', () => {
    it('should restyle field TextField', () => {
        const errorStyles = {
            className: 'alert alert-danger',
        };

        const Fields = fieldsRestyle({
            TextField: {
                className: 'form-control',
                errorStyles,
            },
        }, { TextField });
        expect(Object.keys(Fields).length).toBe(1);
        const TextComponent = Fields.TextField;
        const { getByRole } = render(<TextComponent />);
        const textField = getByRole('textbox'); // Assuming TextField renders an input element
        expect(textField).toHaveClass('form-control');
    });
});
