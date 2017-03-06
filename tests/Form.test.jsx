import jsdom from 'jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Schema from 'form-schema-validation';
import { shallow } from 'enzyme';
import { TextField } from '../src/components/TextField';

describe('Form fields', () => {

    const createTestComponent = (props = {}, Field) => {
        const renderedTextField = shallow(
            <div>
                <TextField
                    {...props}
                />
            </div>
        );
        renderedTextField.render();
        return renderedTextField.find(Field);
    };

    it('TextField should have props', () => {
        const mockFunction = jest.fn();
        const TextFieldComponent = createTestComponent({
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: ['testError']
        }, TextField);
        expect(TextFieldComponent.props().name).toBe('firstName');
        expect(TextFieldComponent.props().label).toBe('first name');
        expect(TextFieldComponent.props().onChange).toBe(mockFunction);
        TextFieldComponent.simulate('change','test');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('TextField should have props2', (done) => {
        const TextFieldComponent = createTestComponent({
            name: 'firstName',
            label: 'first name',
            onChange: (value) => {
                expect(value).toBe('test');
                done();
            }
        }, TextField);
        expect(TextFieldComponent.props().name).toBe('firstName');
        expect(TextFieldComponent.props().label).toBe('first name');
        TextFieldComponent.simulate('change','test');
    });
    //
    // console.log(TextField);
    // it('TextField should have props', () => {
    //     const textFieldComponent = renderedForm.find(TextField);
    //     textFieldComponent.render();
    //     expect(textFieldComponent.props().name).toBe('firstName');
    //     expect(textFieldComponent.props().className).toBe('testClassName');
    //     expect(textFieldComponent.props().wrapperClassName).toBe('testWrapperClassName');
    //     expect(textFieldComponent.props().type).toBe('text');
    //     expect(textFieldComponent.props().placeholder).toBe('testPlaceholder');
    // });
    //
    // it('SubmitField should have prop value', () => {
    //     const submitFieldComponent = renderedForm.find(SubmitField);
    //     // submitFieldComponent.render();
    //     expect(submitFieldComponent.props().value).toBe('Save');
    //     submitFieldComponent.simulate('click');
    //     expect(mockSubmit.mock.calls.length).toBe(1);
    // });
});