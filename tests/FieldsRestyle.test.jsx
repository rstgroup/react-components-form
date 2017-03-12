import React from 'react';
import { mount } from 'enzyme';
import TextField from '../src/components/TextField';
import NumberField from '../src/components/NumberField';
import FieldsRestyle from '../src/components/FieldsRestyle';

describe('FieldsRestyle', () => {
    it('should restyle field TextField',() => {
        const errorStyles = {
            className: 'alert alert-danger'
        };

        const Fields = FieldsRestyle({
            TextField: {
                className: 'form-control',
                errorStyles
            }
        });
        expect(Object.keys(Fields).length).toBe(10);
        const TextComponent = Fields.TextField;
        const textWrapper = mount(<TextComponent />);
        expect(textWrapper.find(TextField).props().className).toBe('form-control');
        const NumberComponent = Fields.NumberField;
        const numberWrapper = mount(<NumberComponent />);
        expect(numberWrapper.find(NumberField).props().className).toBe(undefined);
    });
});