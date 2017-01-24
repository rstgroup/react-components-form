import React from 'react';
import FieldConnect from './FieldConnect';

const ObjectField = ({
    className,
    onChange,
    name,
    errors,
    error,
    value,
    label
}) => {
    const onChangeData = (e) => {
        const inputValue = e.target.value;
        const name = e.target.name;
        const data = Object.assign({}, value);
        data[name] = inputValue;
        onChange(data);
    };
    return (
        <div className={className}>
            {console.log('ObjectField', error)}
            {label && <label>{label}</label>}
            <div>
                <input
                    type="text"
                    name="data"
                    onChange={onChangeData}
                    value={value && value.data}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="message"
                    onChange={onChangeData}
                    value={value && value.message}
                />
            </div>
        </div>
    );
};

export default FieldConnect(ObjectField);