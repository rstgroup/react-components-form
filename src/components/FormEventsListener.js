class FormEventsListener {
    constructor() {
        this.events = {};
    }
    registerEvent(name, method) {
        this.events[name] = method;
    }
    unregisterEvent(name){
        if(this.events[name]) {
            delete this.events[name];
        }
    }
    callEvent(name, data) {
        if(typeof this.events[name] === 'function') {
            return this.events[name](data);
        }
    }
}

export default FormEventsListener;