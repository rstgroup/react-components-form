import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

const parseArrayOfErrors = (array) => {
    let parsedErrors = [];
    array.forEach((data) => {
        parsedErrors = parsedErrors.concat(parseErrors(data));
    });
    return parsedErrors;
};

const parseObjectOfErrors = (obj) => {
    let parsedErrors = [];
    Object.keys(obj).forEach((index) => {
        parsedErrors = parsedErrors.concat(parseErrors(obj[index]));
    });
    return parsedErrors;
};

const parseErrors = (data) => {
    const preparedData = [];
    if (Array.isArray(data)) {
        return preparedData.concat(parseArrayOfErrors(data));
    }
    if (typeof data === 'object') {
        return preparedData.concat(parseObjectOfErrors(data));
    }
    if (typeof data === 'string') {
        return [data];
    }
    return preparedData;
};


export class ErrorsContainer extends Component {
    getErrors() {
        const { getAllValidationErrors } = this.context;
        return parseErrors(getAllValidationErrors());
    }
    render() {
        const errors = this.getErrors();
        return (
            <ErrorField
                {...this.props}
                errors={errors}
            />
        );
    }
}

ErrorsContainer.contextTypes = {
    getAllValidationErrors: PropTypes.func,
};

export default ErrorsContainer;
