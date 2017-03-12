import React, { PropTypes } from 'react';
import Form from './Form';

const restyledFields = {
    Form
};

export const FieldRestyle = (fields, styles) => {
    Object.keys(fields).forEach(fieldName => {
        const Field = fields[fieldName];

        restyledFields[fieldName] = (props) => (
            <Field
                {...styles[fieldName] || {}}
                {...props}
            />
        )
    });
    return restyledFields;
};

export default FieldRestyle;
