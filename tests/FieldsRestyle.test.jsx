import React from 'react';
import { mount } from 'enzyme';
import TextField from '../src/components/TextField';
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
        }, { TextField });
        expect(Object.keys(Fields).length).toBe(1);
        const TextComponent = Fields.TextField;
        const textComponentWrapper = mount(<TextComponent />);
        expect(textComponentWrapper.find(TextField).props().className).toBe('form-control');
    });
});