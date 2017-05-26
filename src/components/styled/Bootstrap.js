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
import AutocompleteFieldUnstyled from '../AutocompleteField';
export { default as Form } from '../Form';

const errorStyles = {
    className: 'alert alert-danger'
};

const Fields = fieldRestyle({
    TextFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    DateFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    TextareaFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    NumberFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    SubmitFieldUnstyled: {
        wrapperClassName: 'clearfix',
        className: 'btn btn-primary pull-right',
        errorStyles
    },
    SelectFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    AutocompleteFieldUnstyled: {
        className: 'form-control',
        wrapperClassName: 'form-group',
        errorStyles
    },
    CheckboxFieldUnstyled: {
        wrapperClassName: 'form-group checkbox',
        errorStyles
    },
    ListFieldUnstyled: {
        className: 'form-group',
        wrapperClassName: 'form-group',
        itemWrapperClassName: 'form-group clearfix',
        errorStyles,
        addButton: {
            className: 'btn btn-success btn-sm'
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
    ListFieldUnstyled,
    AutocompleteFieldUnstyled
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
export const AutocompleteField = Fields.AutocompleteFieldUnstyled;