import React from 'react';
import BookForm from './book';
import LoginForm from './login';
import RegistrationForm from './registration';
import ForgotPasswordForm from './forgotPassword';
import ResetPasswordForm from './resetPassword';
import AppointmentForm from './appointment';
import ServiceForm from './service';
import TimeManageForm from './timeManage';
import Fields from './Fields';
import {
    row,
    column,
    form,
    leftNavigation,
} from './demo.css';

const Demo = () => (
    <div className="container">
        <div className={leftNavigation}>
            <a href="#about">About</a>
            <a href="#fields">Fields</a>
            <a href="#fields">Fields</a>
            <a href="#fields">Fields</a>
            <a href="#fields">Fields</a>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <h2>REACT COMPONENTS FORM DEMO</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-12">
                <h3 id="about">About</h3>
                <div className="well">
                    React components form give you posibility to create forms with schema validation using "form-schema-validation". You can easy create any form with any inputs and create Your own custom fields and validators. Also You can create object fields that represents some object data. Please read another sections of this readme to check what You can use in your project.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-12">
                <h3 id="fields">Fields</h3>
                <div className="well">
                    You have by default 9 types of fields:
                </div>
                <div className="well">
                    <Fields />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well" id="fields">
                    <LoginForm />
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
                    <RegistrationForm />
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
                    <ForgotPasswordForm />
                </div>
                <div className="well">
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
                    <BookForm />
                </div>
            </div>
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
