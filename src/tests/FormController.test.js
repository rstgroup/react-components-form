import React from 'react';
import { render } from '@testing-library/react';
import Form from '../Form';
import FormController from '../FormController';

describe('FormController', () => {
    let form;
    beforeEach(() => {
        const { container } = render(<Form onSubmit={() => {}} />);
        form = container.firstChild._reactInternals.child.stateNode;
    });

    it('should set form instance in controller', () => {
        const controller = new FormController();
        expect(controller.form).toEqual({});
        controller.setForm(form);
        expect(controller.form).toEqual(form);
    });

    it('should get form instance from controller', () => {
        const controller = new FormController();
        controller.setForm(form);
        expect(controller.getForm()).toEqual(form);
    });

    it('should set new schema in form instance', () => {
        const controller = new FormController();
        const schema = { validate: () => ({}) };
        controller.setForm(form);
        expect(form.state.schema).toEqual({});
        controller.setSchema(schema);
        expect(form.state.schema).toEqual(schema);
    });

    it('should get schema from form instance', () => {
        const controller = new FormController();
        const schema = { validate: () => ({}) };
        controller.setForm(form);
        controller.setSchema(schema);
        expect(controller.getSchema()).toEqual(schema);
    });

    it('should get validation errors from form instance', () => {
        const controller = new FormController();
        const mockedErrors = { foo: 'bar' };
        form.state.validationErrors = mockedErrors;
        controller.setForm(form);
        expect(controller.getErrors()).toEqual(mockedErrors);
    });

    it('should set field value', () => {
        const controller = new FormController();
        const name = 'foo';
        const value = 'bar';
        form.setModel = jest.fn();
        controller.setForm(form);
        controller.setFieldValue(name, value);
        expect(form.setModel).toHaveBeenCalledWith(name, value);
    });

    it('should get field value', () => {
        const controller = new FormController();
        const name = 'foo';
        const value = 'bar';
        form.getModel = jest.fn(() => value);
        controller.setForm(form);
        expect(controller.getFieldValue(name)).toEqual(value);
        expect(form.getModel).toHaveBeenCalledWith(name);
    });
});
