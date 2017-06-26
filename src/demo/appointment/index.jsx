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
import { clients, places } from './data';
import style from '../demo.css';

const renderPhoneItem = ({phone, name}) => (
    <div className={style.autocompleteListItem}>
        <div className={style.autocompleteListItemPhone}>{phone}</div>
        <div className={style.autocompleteListItemName}>{name}</div>
    </div>
);

const renderPlaceItem = ({name}) => (
    <div className={style.autocompleteListItem}>
        <div className={style.autocompleteListItemName}>{name}</div>
    </div>
);

const renderPlaceSectionTitle = ({title}) => (
    <div className={style.autocompleteListSectionHeader}>
        {title}
    </div>
);

const el = new FormEventsListener();
el.registerEvent('clientData');
class AppointmentForm extends Component{
    constructor(props) {
        super(props);
        this.getPhoneValue = this.getPhoneValue.bind(this);
        this.getPlaceValue = this.getPlaceValue.bind(this);
    }
    getPhoneValue(value) {
        el.callEvent('clientData', value);
        return value.phone;
    }
    getPlaceValue(value) {
        return value.name;
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
                        renderItem={renderPhoneItem}
                        getValue={this.getPhoneValue}
                        wrapperClassName={style.autocompleteListItemWrapper}
                        theme={{
                            suggestionsContainer: style.suggestionsContainer
                        }}
                        alwaysRenderSuggestions
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
                <AutocompleteField
                    name="place"
                    placeholder="Place"
                    options={places}
                    searchKey="name"
                    renderItem={renderPlaceItem}
                    renderSectionTitle={renderPlaceSectionTitle}
                    getValue={this.getPlaceValue}
                    multiSection
                    suggestionsShownIfFieldEmpty
                    sectionSuggestionsIndex="suggestions"
                    onSuggestionSelected={(event, { suggestion }) => {
                        console.log('suggestionSelected', event, suggestion);
                    }}
                    wrapperClassName={style.autocompleteListItemWrapper}
                    theme={{
                        suggestionsContainer: style.suggestionsContainer
                    }}
                />
                <SubmitField value="Submit"/>
            </Form>
        );
    }
}

export default AppointmentForm;