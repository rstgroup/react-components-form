import React, { Component } from 'react';
import {
    Form,
    TextField,
    DateField,
    SelectField,
    ObjectField,
    AutocompleteField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import { FormEventsListener } from '../../components';
import appointmentSchema from './schema';
import { clients } from './data';
import style from '../demo.css';

const renderItem = ({phone, name}) => (
    <div className={style.autocompleteListItem}>
        <div className={style.autocompleteListItemPhone}>{phone}</div>
        <div className={style.autocompleteListItemName}>{name}</div>
    </div>
);

const el = new FormEventsListener();
el.registerEvent('clientData');
class AppointmentForm extends Component{
    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
    }
    getValue(value) {
        el.callEvent('clientData', value);
        return value.phone;
    }
    render() {
        return (
            <Form
                eventsListener={el}
                schema={appointmentSchema}
                onSubmit={data => console.log(data)}
                onError={(errors, data) => console.log('error', errors, data)}
            >
                <h4>APPOINTMENT FORM</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <DateField name="date"/>
                    </div>
                    <div className="col-xs-6">
                        <TextField name="time" type="time"/>
                    </div>
                </div>
                <ObjectField name="client">
                    <AutocompleteField
                        name="phone"
                        placeholder="Phone"
                        options={clients}
                        searchKey="phone"
                        renderItem={renderItem}
                        getValue={this.getValue}
                        wrapperClassName={style.autocompleteListItemWrapper}
                        theme={{
                            suggestionsContainer: style.suggestionsContainer
                        }}
                    />
                    <TextField
                        name="name"
                        placeholder="Name & Surname"
                        onEmitEvents={{name:'clientData', method: ({ name }, self) => self.onChangeData(name)}}
                    />
                    <TextField
                        name="email"
                        placeholder="Email"
                        onEmitEvents={{name:'clientData', method: ({ email }, self) => self.onChangeData(email)}}
                    />
                </ObjectField>
                <SelectField name="userId" label="Responsible person"/>
                <SelectField name="serviceId" label="Service"/>
                <SubmitField value="Submit"/>
            </Form>
        );
    }
}

export default AppointmentForm;