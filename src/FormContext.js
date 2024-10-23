import React from 'react';

const FormContext = React.createContext({
    setModel: () => {},
    getModel: () => {},
    getSchema: () => {},
    submitForm: () => {},
    getValidationErrors: () => {},
    getAllValidationErrors: () => {},
    getPath: () => {},
    eventsEmitter: {
        emit: () => {},
        registerEvent: () => {},
        listen: () => {},
        unregisterEvent: () => {},
        unlisten: () => {},
    },
    markFieldAsTouched: () => {},
    hasBeenTouched: () => {},
    validateOnChange: false,
    isFormSubmitted: false,
    setValidator: () => {},
    removeValidator: () => {},
});

export default FormContext;
