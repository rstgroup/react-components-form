import React from 'react';
import {
    Form,
    ObjectField,
    SelectField,
    CheckboxField,
    SubmitField,
} from '../../components/styled/Bootstrap';
import Schema from 'form-schema-validation';

const timeSchema = new Schema({
    hours: {
        type: String,
        required: true,
        defaultValue: '08',
        options: [
            '00',
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23'
        ]
    },
    minutes: {
        type: String,
        required: true,
        options: [
            '00',
            '15',
            '30',
            '45',
            '60'
        ]
    }
});

const workDaySchema = new Schema({
    from: {
        type: timeSchema,
        defaultValue: {
            hours: '08',
            minutes: '00'
        }
    },
    to: {
        type: timeSchema,
        defaultValue: {
            hours: '16',
            minutes: '00'
        }
    },
    workDay: {
        type: Boolean,
        label: 'Work day',
        defaultValue: true,
        required: true
    }
});

const timeManageSchema = new Schema({
    monday:{
        type: workDaySchema
    },
    tuesday:{
        type: workDaySchema
    },
    wednesday:{
        type: workDaySchema
    },
    thursday:{
        type: workDaySchema
    },
    friday:{
        type: workDaySchema
    },
    saturday:{
        type: workDaySchema
    },
    sunday:{
        type: workDaySchema
    }
});

const TimeManageForm = () => (
    <Form
        schema={timeManageSchema}
        onSubmit={data => console.log(data)}
        onError={(errors, data) => console.log('error', errors, data)}
    >
        <h4>WORK MANAGE FORM</h4>
        <div className="row">
            <div className="col-xs-12">
                Monday
                <ObjectField name="monday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Tuesday
                <ObjectField name="tuesday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Wednesday
                <ObjectField name="wednesday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Thursday
                <ObjectField name="thursday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Friday
                <ObjectField name="friday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Saturday
                <ObjectField name="saturday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
                Sunday
                <ObjectField name="sunday" wrapperClassName="row">
                    <ObjectField name="from" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-2 text-center">-</div>
                    <ObjectField name="to" wrapperClassName="col-xs-5">
                        <div className="row">
                            <SelectField name="hours" wrapperClassName="col-xs-6"/>
                            <SelectField name="minutes" wrapperClassName="col-xs-6"/>
                        </div>
                    </ObjectField>
                    <div className="col-xs-12">
                        <CheckboxField name="workDay" />
                    </div>
                </ObjectField>
            </div>
        </div>
        <SubmitField value="Submit" />
    </Form>
);

export default TimeManageForm;