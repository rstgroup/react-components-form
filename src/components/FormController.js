class FormController {
    constructor() {
        this.form = {};
    }
    setForm(form) {
        this.form = form;
    }
    getForm() {
        return this.form;
    }
    setSchema(schema) {
        this.getForm().setState({ schema });
    }
    getSchema() {
        return this.getForm().state.schema;
    }
    getErrors() {
        return this.getForm().getAllValidationErrors();
    }
    setFieldValue(name, value) {
        this.getForm().setModel(name, value);
    }
    getFieldValue(name) {
        return this.getForm().getModel(name);
    }
}

export default FormController;
