import PropTypes from 'prop-types';
import ErrorField from './Error.field.jsx';

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

export const ErrorsContainer = (props, context) => {
    const getErrors = () => {
        const { getAllValidationErrors } = context;
        return parseErrors(getAllValidationErrors());
    };
    const errors = getErrors();
    return (
        <ErrorField
            {...this.props}
            errors={errors}
        />
    );
}

ErrorsContainer.contextTypes = {
    getAllValidationErrors: PropTypes.func,
};

export default ErrorsContainer;
