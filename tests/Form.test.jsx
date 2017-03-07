import jsdom from 'jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Schema from 'form-schema-validation';
import { shallow } from 'enzyme';
import {
    TextField,
    TextareaField,
    NumberField,
    SubmitField,
    SelectField,
    CheckboxField,
    DateField
} from '../src/components/separate';

describe('Form fields', () => {

    const createTestComponent = (props = {}, Field) => {
        const renderedTextField = shallow(
            <div>
                <Field
                    {...props}
                />
            </div>
        );
        renderedTextField.render();
        return renderedTextField.find(Field);
    };

    it('TextField should have props and have onChange method', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            name: 'firstName',
            label: 'first name',
            onChange: mockFunction,
            error: true,
            errors: ['testError']
        }, TextField);
        expect(FieldComponent.props().name).toBe('firstName');
        expect(FieldComponent.props().label).toBe('first name');
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', 'Jan');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('TextareaField should have props and have onChange method', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            name: 'description',
            label: 'description',
            onChange: mockFunction,
            error: true,
            errors: ['testError']
        }, TextareaField);
        expect(FieldComponent.props().name).toBe('description');
        expect(FieldComponent.props().label).toBe('description');
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', 'test description');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('NumberField should have props and have onChange method', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            name: 'age',
            label: 'Age',
            onChange: mockFunction,
            error: true,
            errors: ['testError']
        }, NumberField);
        expect(FieldComponent.props().name).toBe('age');
        expect(FieldComponent.props().label).toBe('Age');
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', 20);
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('SelectField should have props and have onChange method', () => {
        const mockFunction = jest.fn();
        const options = ['country1', 'country2'];
        const FieldComponent = createTestComponent({
            name: 'country',
            label: 'Country',
            onChange: mockFunction,
            options: options,
            error: true,
            errors: ['testError']
        }, SelectField);
        expect(FieldComponent.props().name).toBe('country');
        expect(FieldComponent.props().label).toBe('Country');
        expect(FieldComponent.props().options).toBe(options);
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', 'test');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('SubmitField should run submit method on click', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            value: 'Save',
            submit: mockFunction
        }, SubmitField);
        expect(FieldComponent.props().value).toBe('Save');
        expect(FieldComponent.props().submit).toBe(mockFunction);
    });

    it('DateField should run submit method on click', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            name: 'createdAt',
            label: 'Created at',
            onChange: mockFunction,
            error: true,
            errors: ['testError']
        }, DateField);
        expect(FieldComponent.props().name).toBe('createdAt');
        expect(FieldComponent.props().label).toBe('Created at');
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', '01.01.2017');
        expect(mockFunction.mock.calls.length).toBe(1);
    });

    it('CheckboxField should run submit method on click', () => {
        const mockFunction = jest.fn();
        const FieldComponent = createTestComponent({
            name: 'acceptTerms',
            label: 'Accept terms',
            onChange: mockFunction,
            value: true,
            error: true,
            errors: []
        }, CheckboxField);
        expect(FieldComponent.props().name).toBe('acceptTerms');
        expect(FieldComponent.props().label).toBe('Accept terms');
        expect(FieldComponent.props().value).toBe(true);
        expect(FieldComponent.props().onChange).toBe(mockFunction);
        FieldComponent.simulate('change', true);
        expect(mockFunction.mock.calls.length).toBe(1);
    });
});