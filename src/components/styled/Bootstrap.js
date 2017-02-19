import FieldRestyle from '../FieldsRestyle';

const errorStyles = {
    className: 'alert alert-danger'
};

const Fields = FieldRestyle({
    TextField: {
        className: 'form-control',
        errorStyles
    },
    DateField: {
        className: 'form-control',
        errorStyles
    },
    TextareaField: {
        className: 'form-control',
        errorStyles
    },
    NumberField: {
        className: 'form-control',
        errorStyles
    },
    SubmitField: {
        className: 'btn btn-primary',
        errorStyles
    },
    SelectField: {
        className: 'form-control',
        errorStyles
    },
    CheckboxField: {
        wrapperClassName: 'checkbox',
        errorStyles
    },
    ListField: {
        className: 'form-control',
        errorStyles,
        addButton: {
            className: 'btn btn-success btn-xs'
        },
        removeButton: {
            className: 'btn btn-danger btn-xs pull-right'
        }
    }
});

export const Form = Fields.Form;
export const TextField = Fields.TextField;
export const DateField = Fields.DateField;
export const TextareaField = Fields.TextareaField;
export const NumberField = Fields.NumberField;
export const SubmitField = Fields.SubmitField;
export const SelectField = Fields.SelectField;
export const CheckboxField = Fields.CheckboxField;
export const ObjectField = Fields.ObjectField;
export const ListField = Fields.ListField;
export default Fields;