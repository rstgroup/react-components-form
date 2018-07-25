import '../enzymeConfig';
import React from 'react';
import { mount } from 'enzyme';
import TextField from '../../src/components/TextField';
import Form from '../../src/components/Form';
import fieldsRestyle from '../../src/components/FieldsRestyle';

describe('FieldsRestyle', () => {
    it('should restyle field TextField',() => {
        const errorStyles = {
            className: 'alert alert-danger'
        };

        const Fields = fieldsRestyle({
            TextField: {
                className: 'form-control',
                errorStyles
            }
        }, { TextField });
        expect(Object.keys(Fields).length).toBe(1);
        const TextComponent = Fields.TextField;
        const textComponentWrapper = mount(<Form><TextComponent /></Form>);
        expect(textComponentWrapper.find(TextField).props().className).toBe('form-control');
    });
});