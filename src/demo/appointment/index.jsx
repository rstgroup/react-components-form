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
el.registerEvent('test');
class AppointmentForm extends Component{
    getAutoCompleteValue() {}
    render() {
        setTimeout(()=>{
            el.callEvent('test', {dupa:'test'});
        },3000);
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
                        items={clients}
                        searchKey="phone"
                        renderItem={renderItem}
                        onEmitEvents={{name:'test', method: (data) => console.log(data)}}
                        getValue={(value) => value.phone}
                        wrapperClassName={style.autocompleteListItemWrapper}
                        optionsContainerClassName={style.suggestionsContainer}
                    />
                    <TextField name="name" placeholder="Name & Surname"/>
                    <TextField name="email" placeholder="Email"/>
                </ObjectField>
                <SelectField name="userId" label="Responsible person"/>
                <SelectField name="serviceId" label="Service"/>
                <SubmitField value="Submit"/>
            </Form>
        );
    }
}

export default AppointmentForm;