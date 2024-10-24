import React, { useRef, useEffect } from 'react';
import { render, waitFor, act } from '@testing-library/react';
import Form from '../Form';
import FormController from '../FormController';

describe('FormController', () => {
    let form;
    beforeEach(() => {
        const FormWrapper = () => {
            const formRef = useRef();
            useEffect(() => {
                form = formRef.current;
            }, []);
            return <Form ref={formRef} onSubmit={() => {}} />;
        };
        render(<FormWrapper />);
    });

    it('should set form instance in controller', () => {
        const controller = new FormController();
        expect(controller.form).toEqual({});
        act(() => {
            controller.setForm(form);
        });
        expect(controller.form).toEqual(form);
    });

    it('should get form instance from controller', () => {
        const controller = new FormController();
        act(() => {
            controller.setForm(form);
        });
        expect(controller.getForm()).toEqual(form);
    });

    it('should set new schema in form instance', async () => {
        const controller = new FormController();
        const schema = { validate: () => ({}) };
        act(() => {
            controller.setForm(form);
        });
        expect(form.state.schema).toEqual({});
        act(() => {
            controller.setSchema(schema);
        });
        await waitFor(() => {
            expect(form.state.schema).toEqual(schema);
        });
    });

    it('should get schema from form instance', async () => {
        const controller = new FormController();
        const schema = { validate: () => ({}) };
        act(() => {
            controller.setForm(form);
            controller.setSchema(schema);
        });
        await waitFor(() => {
            expect(controller.getSchema()).toEqual(schema);
        });
    });

    it('should get validation errors from form instance', async () => {
        const controller = new FormController();
        const mockedErrors = { foo: 'bar' };
        form.state.validationErrors = mockedErrors;
        act(() => {
            controller.setForm(form);
        });
        await waitFor(() => {
            expect(controller.getErrors()).toEqual(mockedErrors);
        });
    });

    it('should set field value', async () => {
        const controller = new FormController();
        const name = 'foo';
        const value = 'bar';
        form.setModel = jest.fn();
        act(() => {
            controller.setForm(form);
            controller.setFieldValue(name, value);
        });
        await waitFor(() => {
            expect(form.setModel).toHaveBeenCalledWith(name, value);
        });
    });

    it('should get field value', async () => {
        const controller = new FormController();
        const name = 'foo';
        const value = 'bar';
        form.getModel = jest.fn(() => value);
        act(() => {
            controller.setForm(form);
        });
        await waitFor(() => {
            expect(controller.getFieldValue(name)).toEqual(value);
            expect(form.getModel).toHaveBeenCalledWith(name);
        });
    });
});
