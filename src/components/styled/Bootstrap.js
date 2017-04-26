import fieldRestyle from '../FieldsRestyle';
import TextFieldUnstyled from '../TextField';
import DateFieldUnstyled from '../DateField';
import TextareaFieldUnstyled from '../TextareaField';
import NumberFieldUnstyled from '../NumberField';
import SubmitFieldUnstyled from '../SubmitField';
import SelectFieldUnstyled from '../SelectField';
import CheckboxFieldUnstyled from '../CheckboxField';
import ObjectFieldUnstyled from '../ObjectField';
import ListFieldUnstyled from '../ListField';
export { default as Form } from '../Form';

const errorStyles = {
    className: 'alert alert-danger'
};

const Fields = fieldRestyle({
    TextFieldUnstyled: {
        className: 'form-control',
        errorStyles
    },
    DateFieldUnstyled: {
        className: 'form-control',
        errorStyles
    },
    TextareaFieldUnstyled: {
        className: 'form-control',
        errorStyles
    },
    NumberFieldUnstyled: {
        className: 'form-control',
        errorStyles
    },
    SubmitFieldUnstyled: {
        className: 'btn btn-primary',
        errorStyles
    },
    SelectFieldUnstyled: {
        className: 'form-control',
        errorStyles
    },
    CheckboxFieldUnstyled: {
        wrapperClassName: 'checkbox',
        errorStyles
    },
    ListFieldUnstyled: {
        errorStyles,
        addButton: {
            className: 'btn btn-success btn-xs'
        },
        removeButton: {
            className: 'btn btn-danger btn-xs pull-right'
        }
    }
}, {
    TextFieldUnstyled,
    DateFieldUnstyled,
    TextareaFieldUnstyled,
    NumberFieldUnstyled,
    SubmitFieldUnstyled,
    SelectFieldUnstyled,
    CheckboxFieldUnstyled,
    ObjectFieldUnstyled,
    ListFieldUnstyled
});


export const TextField = Fields.TextFieldUnstyled;
export const DateField = Fields.DateFieldUnstyled;
export const TextareaField = Fields.TextareaFieldUnstyled;
export const NumberField = Fields.NumberFieldUnstyled;
export const SubmitField = Fields.SubmitFieldUnstyled;
export const SelectField = Fields.SelectFieldUnstyled;
export const CheckboxField = Fields.CheckboxFieldUnstyled;
export const ObjectField = Fields.ObjectFieldUnstyled;
export const ListField = Fields.ListFieldUnstyled;