import React from 'react';
import BookForm from './book';
import LoginForm from './login';
import RegistrationForm from './registration';
import ForgotPasswordForm from './forgotPassword';
import ResetPasswordForm from './resetPassword';
import AppointmentForm from './appointment';
import ServiceForm from './service';
import TimeManageForm from './timeManage';
import { row, column, form } from './demo.css';

const Demo = () => (
    <div className="container">
        <div className="row">
            <div className="col-xs-12">
                <h2>REACT COMPONENTS FORM DEMO</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <div className="well">
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
