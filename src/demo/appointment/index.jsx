import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    TextField,
    DateField,
    SelectField,
    ObjectField,
    AutocompleteField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import { FormEventsEmitter } from '../../components';
import appointmentSchema from './schema';
import { clients, places } from './data';
import style from '../demo.css';
import { consoleData } from '../demoHelpers';

const renderPhoneItem = ({ phone = '', name = '' }) => (
    <div className={style.autocompleteListItem}>
        <div className={style.autocompleteListItemPhone}>{phone}</div>
        <div className={style.autocompleteListItemName}>{name}</div>
    </div>
);

renderPhoneItem.propTypes = {
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

const renderPlaceItem = ({ name = '' }) => (
    <div className={style.autocompleteListItem}>
        <div className={style.autocompleteListItemName}>{name}</div>
    </div>
);

renderPlaceItem.propTypes = {
    name: PropTypes.string.isRequired,
};

const renderPlaceSectionTitle = ({ title = '' }) => (
    <div className={style.autocompleteListSectionHeader}>
        {title}
    </div>
);

renderPlaceSectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

const el = new FormEventsEmitter();
class AppointmentForm extends Component {
    static getPhoneValue(value) {
        el.emit('clientData', value);
        return value.phone;
    }
    static getPlaceValue(value) {
        return value.name;
    }
    render() {
        return (
            <Form
                eventsEmitter={el}
                schema={appointmentSchema}
                onSubmit={data => consoleData(data)}
                onError={(validationErrors, data) => consoleData('error', validationErrors, data)}
            >
                <h4>APPOINTMENT FORM</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <DateField name="date" />
                    </div>
                    <div className="col-xs-6">
                        <TextField name="time" type="time" />
                    </div>
                </div>
                <ObjectField name="client">
                    <AutocompleteField
                        name="phone"
                        placeholder="Phone"
                        options={clients}
                        searchKey="phone"
                        renderItem={renderPhoneItem}
                        getValue={AppointmentForm.getPhoneValue}
                        wrapperClassName={style.autocompleteListItemWrapper}
                        theme={{
                            suggestionsContainer: style.suggestionsContainer,
                        }}
                        alwaysRenderSuggestions
                    />
                    <TextField
                        name="name"
                        placeholder="Name & Surname"
                        onEmitEvents={{ name: 'clientData', method: ({ name }, self) => self.onChangeData(name) }}
                    />
                    <TextField
                        name="email"
                        placeholder="Email"
                        onEmitEvents={{ name: 'clientData', method: ({ email }, self) => self.onChangeData(email) }}
                    />
                </ObjectField>
                <SelectField name="userId" label="Responsible person" />
                <SelectField name="serviceId" label="Service" />
                <AutocompleteField
                    name="place"
                    placeholder="Place"
                    options={places}
                    searchKey="name"
                    renderItem={renderPlaceItem}
                    renderSectionTitle={renderPlaceSectionTitle}
                    getValue={AppointmentForm.getPlaceValue}
                    multiSection
                    suggestionsShownIfFieldEmpty
                    sectionSuggestionsIndex="suggestions"
                    onSuggestionSelected={(event, { suggestion }) => {
                        consoleData('suggestionSelected', event, suggestion);
                    }}
                    wrapperClassName={style.autocompleteListItemWrapper}
                    theme={{
                        suggestionsContainer: style.suggestionsContainer,
                    }}
                />
                <SubmitField value="Submit" />
            </Form>
        );
    }
}

export default AppointmentForm;
