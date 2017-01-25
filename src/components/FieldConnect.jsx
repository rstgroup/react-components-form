import React, { PropTypes } from 'react';

const FieldConnect = (Component) => {
    class FieldConnector extends React.Component {
        constructor(props) {
            super(props);
            this.onChangeData = this.onChangeData.bind(this);
            this.submit = this.submit.bind(this);
            this.getErrors = this.getErrors.bind(this);
            this.hasError = this.hasError.bind(this);
            this.getPropsFromSchema = this.getPropsFromSchema.bind(this);
        }

        componentWillMount() {
            const { name, value, options } = this.props;
            const { setModel } = this.context;
            if (name && value) setModel(name, value);
            if (name && !value && options) setModel(name, options[0]);
        }

        onChangeData(value) {
            const { name } = this.props;
            const { setModel } = this.context;
            setModel(name, value);
        }

        getValue() {
            const { name, value } = this.props;
            const { getModel } = this.context;
            return getModel(name) || value;
        }

        getPropsFromSchema() {
            const { name } = this.props;
            const { getSchema } = this.context;
            return getSchema(name);
        }

        submit() {
            const { submitForm } = this.context;
            submitForm();
        }

        getErrors() {
            const { name } = this.props;
            const { getErrors } = this.context;
            return getErrors(name);
        }

        hasError() {
            return this.getErrors().length > 0;
        }

        render() {
            return (<Component
                {...this.getPropsFromSchema()}
                {...this.props}
                onChange={this.onChangeData}
                submit={this.submit}
                errors={this.getErrors()}
                error={this.hasError()}
                value={this.getValue()}
            />);
        }
    }

    FieldConnector.contextTypes = {
        setModel: PropTypes.func,
        getModel: PropTypes.func,
        getSchema: PropTypes.func,
        submitForm: PropTypes.func,
        getErrors: PropTypes.func
    };

    return FieldConnector;
};

export default FieldConnect;