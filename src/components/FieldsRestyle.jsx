import React, { PropTypes } from 'react';
import Form from './Form';
import TextField from './TextField';
import DateField from './DateField';
import TextareaField from './TextareaField';
import NumberField from './NumberField';
import SubmitField from './SubmitField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import ObjectField from './ObjectField';
import ListField from './ListField';

const fields = {
    TextField,
    DateField,
    TextareaField,
    NumberField,
    SubmitField,
    SelectField,
    CheckboxField,
    ObjectField,
    ListField
};

const restyledFields = {
    Form
};

export const FieldRestyle = (styles) => {
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
