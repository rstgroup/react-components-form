import FieldRestyle from '../FieldsRestyle';

const Fields = FieldRestyle({
    TextField: {
        className: 'form-control'
    },
    DateField: {
        className: 'form-control'
    },
    TextareaField: {
        className: 'form-control'
    },
    NumberField: {
        className: 'form-control'
    },
    SubmitField: {
        className: 'btn btn-primary'
    },
    SelectField: {
        className: 'form-control'
    },
    CheckboxField: {
        className: 'form-control'
    },
    ListField: {
        className: 'form-control'
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