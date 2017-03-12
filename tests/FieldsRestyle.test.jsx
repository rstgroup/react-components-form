import React from 'react';
import { mount } from 'enzyme';
import { TextField, NumberField, FieldsRestyle } from '../src/components';

describe('FieldsRestyle', () => {
    it('should restyle field TextField',() => {
        const fields = {
            TextField,
            NumberField
        };

        const errorStyles = {
            className: 'alert alert-danger'
        };

        const Fields = FieldsRestyle(fields, {
            TextField: {
                className: 'form-control',
                errorStyles
            }
        });
        expect(Object.keys(Fields).length).toBe(3);
        const TextComponent = Fields.TextField;
        const textWrapper = mount(<TextComponent />);
        expect(textWrapper.find(TextField).props().className).toBe('form-control');
        const NumberComponent = Fields.NumberField;
        const numberWrapper = mount(<NumberComponent />);
        expect(numberWrapper.find(NumberField).props().className).toBe(undefined);
    });
});