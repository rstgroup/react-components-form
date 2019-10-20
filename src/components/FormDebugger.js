import cloneDeep from 'lodash/cloneDeep';

export const FEATURES = {
    FORM_STATE_HISTORY: 'registerFormStateHistory',
    FIELD_RERENDER: 'registerFieldRerender',
    FIELD_LISTENER: 'registerFieldListeners',
};

const defaultFormDebuggerSettings = {
    [FEATURES.FORM_STATE_HISTORY]: true,
    [FEATURES.FIELD_RERENDER]: true,
    [FEATURES.FIELD_LISTENER]: true
};

export class FormDebugger {
    constructor(settings = {}) {
        this.settings = { ...defaultFormDebuggerSettings, ...settings };
        this.forms = {};
        this.formStateHistory = [];
        this.fieldListeners = {};
        this.fieldRerenders = {};
        this.eventEmitter = {};
        this.emittedEvents = [];

        this.registerStateHistory = this.registerStateHistory.bind(this);
        this.registerFieldListener = this.registerFieldListener.bind(this);
        this.registerFieldRerender = this.registerFieldRerender.bind(this);
        this.registerEmittedEvent = this.registerEmittedEvent.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
    }
    isFeatureEnabled(featureName) {
        return this.settings[featureName];
    }
    registerFormInstance(formInstance) {
        this.forms[formInstance.getPath()] = formInstance;
    }
    registerEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    registerStateHistory(formInstance) {
        if (this.isFeatureEnabled(FEATURES.FORM_STATE_HISTORY)) {
            const formId = formInstance.getPath();
            const state = formInstance.storage.getModel();
            const currentState = {
                formId,
                state: cloneDeep(state),
                time: new Date().toTimeString(),
            };
            this.formStateHistory.push(currentState);
        }
    }
    setFormState(formId, state) {
        const formInstance = this.forms[formId];
        if (formInstance) {
            formInstance.storage.setModel(state);
        }
    }
    registerFieldListener(fieldInstance) {
        if (this.isFeatureEnabled(FEATURES.FIELD_LISTENER)) {
            if (!this.fieldListeners[fieldInstance.getPath()]) {
                this.fieldListeners[fieldInstance.getPath()] = 0;
            }
            this.fieldListeners[fieldInstance.getPath()]++;
        }
    }
    registerFieldRerender(fieldInstance) {
        if (this.isFeatureEnabled(FEATURES.FIELD_RERENDER)) {
            if (!this.fieldRerenders[fieldInstance.getPath()]) {
                this.fieldRerenders[fieldInstance.getPath()] = 0;
            }
            this.fieldRerenders[fieldInstance.getPath()]++;
        }
    }
    hasRegisteredEventEmitter() {
        return typeof this.eventEmitter.emit === 'function';
    }
    emitEvent(name, data) {
        if (this.hasRegisteredEventEmitter()) {
            this.eventEmitter.emit(name, data);
        }
    }
    registerEmittedEvent(eventName, data) {
        this.emittedEvents.push({
            eventName,
            data,
        });
    }
}

export default FormDebugger;
