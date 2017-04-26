import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { get } from '../helpers';

const extendStyles = (
    styles,
    {
        className,
        itemWrapperClassName,
        addButton = {},
        removeButton = {},
        errorStyles = {},
        ...restProps
    }
) => {
    return {
        className: classnames(get(styles,'className'), className),
        itemWrapperClassName: classnames(get(styles,'itemWrapperClassName'), itemWrapperClassName),
        addButton: {
            ...addButton,
            className: classnames(get(styles,'addButton.className'), addButton.className)
        },
        removeButton: {
            ...removeButton,
            className: classnames(get(styles,'removeButton.className'), removeButton.className)
        },
        errorStyles: {
            ...errorStyles,
            className: classnames(get(styles,'errorStyles.className'), errorStyles.className),
            itemClassName: classnames(get(styles,'errorStyles.itemClassName'), errorStyles.itemClassName),
            fieldClassName: classnames(get(styles,'errorStyles.fieldClassName'), errorStyles.fieldClassName)
        },
        ...restProps
    };
};

const fieldRestyle = (styles, fields) => {
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

export default fieldRestyle;
