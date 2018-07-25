import React from 'react';

const FormContext = React.createContext({
    setModel: () => {},
    getModel: () => {},
    getSchema: () => {},
    submitForm: () => {},
    getValidationErrors: () => [],
    getAllValidationErrors: () => [],
    getPath: () => '',
    eventsEmitter: {},
});

export default FormContext;
