import React from 'react';

import LoginForm from './login';
import RegistrationForm from './registration';
import ForgotPasswordForm from './forgotPassword';
import ResetPasswordForm from './resetPassword';

const SimpleForms = () => (
    <div className="row">
        <div className="col-xs-12 col-sm-4">
            <div className="well">
                <LoginForm />
            </div>
        </div>
        <div className="col-xs-12 col-sm-4">
            <div className="well">
                <RegistrationForm />
            </div>
        </div>
        <div className="col-xs-12 col-sm-4">
            <div className="well">
                <ForgotPasswordForm />
            </div>
            <div className="well">
                <ResetPasswordForm />
            </div>
        </div>
    </div>
);

export default SimpleForms;