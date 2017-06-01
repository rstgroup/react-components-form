import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { get } from '../helpers';

const extendStyles = (
    styles,
    {
        className,
        wrapperClassName,
        itemWrapperClassName,
        addButton = {},
        removeButton = {},
        errorStyles = {},
        ...restProps
    }
) => {
    return {
        className: classnames(get(styles,'className'), className),
        wrapperClassName: classnames(get(styles,'wrapperClassName'), wrapperClassName),
        itemWrapperClassName: classnames(get(styles,'itemWrapperClassName'), itemWrapperClassName),
        addButton: {
            ...addButton,
            ...get(styles, 'addButton', {}),
            className: classnames(get(styles,'addButton.className'), addButton.className)
        },
        removeButton: {
            ...removeButton,
            ...get(styles, 'removeButton', {}),
            className: classnames(get(styles,'removeButton.className'), removeButton.className)
        },
        errorStyles: {
            ...errorStyles,
            ...get(styles, 'errorStyles', {}),
            className: classnames(get(styles,'errorStyles.className'), errorStyles.className),
            itemClassName: classnames(get(styles,'errorStyles.itemClassName'), errorStyles.itemClassName),
            fieldClassName: classnames(get(styles,'errorStyles.fieldClassName'), errorStyles.fieldClassName)
        },
        ...restProps
    };
};

const fieldsRestyle = (styles, fields) => {
    const restyledFields = {};
    Object.keys(fields).forEach(fieldName => {
        const Field = fields[fieldName];
        restyledFields[fieldName] = (props) => (
            <Field
                {...extendStyles(styles[fieldName], props)}
            />
        )
    });
    return restyledFields;
};

export default fieldsRestyle;
