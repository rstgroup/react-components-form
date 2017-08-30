import React, { Component, PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

const parseErrors = (data) => {
    let preparedData = [];
    if (Array.isArray(data)) {
        data.forEach((obj) => {
            preparedData = preparedData.concat(parseErrors(obj));
        });
    } else if (typeof data === 'object') {
        Object.keys(data).forEach((errorIndex) => {
            preparedData = preparedData.concat(parseErrors(data[errorIndex]));
        });
    } else if (typeof data === 'string') {
        preparedData.push(data);
    }
    return preparedData;
}

class ErrorsContainer extends Component {
    getErrors() {
        const { getAllErrors } = this.context;
        return parseErrors(getAllErrors());
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
};

ErrorsContainer.contextTypes = {
    getAllErrors: PropTypes.func,
};

export default ErrorsContainer;