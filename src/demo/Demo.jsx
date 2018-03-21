import React from 'react';
import SimpleForms from './SimpleForms';
import ListFieldForms from './ListFieldForms';
import AppointmentForm from './appointment';
import ServiceForm from './service';
import TimeManageForm from './timeManage';

const Demo = () => (
    <div className="container">
        <div className="row">
            <div className="col-xs-12">
                <h2>REACT COMPONENTS FORM DEMO</h2>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-xs-12">
                <h3>Simple forms</h3>
                <SimpleForms />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <h3>Forms with ListField</h3>
                <ListFieldForms />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
                    <AppointmentForm />
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
                    <ServiceForm />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-6">
                <div className="well">
                    <TimeManageForm />
                </div>
            </div>
        </div>
    </div>
);

export default Demo;
