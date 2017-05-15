class FormEventsListener {
    constructor() {
        this.eventsListeners = {
            submit: [],
            validate: [],
            changeModel: [],
            reset: [],
        };
    }
    registerEvent(name) {
        this.eventsListeners[name] = [];
    }
    registerEventListener(name, method) {
        if (
          this.eventsListeners[name] &&
          Array.isArray(this.eventsListeners[name]) &&
          typeof method === 'function'
        ) {
            this.eventsListeners[name].push(method);
        }
    }
    unregisterEvent(name) {
        if(this.eventsListeners[name]) {
            delete this.eventsListeners[name];
        }
    }
    unregisterEventListener(name, handler) {
        if(this.eventsListeners[name] && Array.isArray(this.eventsListeners[name])) {
            const index = this.eventsListeners[name].indexOf(handler);
            if (index > -1) this.eventsListeners[name].splice(index, 1);
        }
    }
    callEvent(name, data) {
        const responseFromEventsListeners = [];
        if (this.eventsListeners[name] && Array.isArray(this.eventsListeners[name])) {
            this.eventsListeners[name].forEach((eventListener) => {
                const response = eventListener(data);
                if (response) responseFromEventsListeners.push(response);
            });
            return responseFromEventsListeners;
        }
    }
}

export default FormEventsListener;
