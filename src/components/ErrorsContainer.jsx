import React, { Component, PropTypes } from 'react';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';

class ErrorsContainer extends Component {
    constructor(props) {
        super(props);
        this.getErrors = this.getErrors.bind(this);
    }
    getErrors() {
        const { getAllErrors } = this.context;
        const errorsObj = getAllErrors();
        let errors = [];
        Object.keys(errorsObj).forEach((errorIndex) => {
            errorsObj[errorIndex].forEach(error => errors.push(error));
        });
        return errors;
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