class FormEventsEmitter {
    constructor() {
        this.listeners = {};
    }

    listen(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        if (typeof listener !== 'function') {
            console.warn(`FormEventsEmitter->listen - "${name}" listener is not a function`);
            return;
        }
        if (this.listeners[name].indexOf(listener) > -1) {
            console.warn(`FormEventsEmitter->listen - "${name}" events listener is allready registered`);
            return;
        }
        this.listeners[name].push(listener);
    }

    unlisten(name, listener) {
        if (!this.listeners[name]) {
            console.warn(`FormEventsEmitter->unlisten - "${name}" event not registered`);
            return;
        }
        if (this.listeners[name].length === 0) {
            console.warn(`FormEventsEmitter->unlisten - "${name}" event dont have registered listener`);
            return;
        }
        const index = this.listeners[name].indexOf(listener);
        if (index < 0) {
            console.warn(`FormEventsEmitter->unlisten - "${name}" listener not exists`);
            return;
        }
        this.listeners[name].splice(index, 1);
    }

    emit(name, data) {
        const responseFromListeners = [];
        if (this.listeners[name] && Array.isArray(this.listeners[name])) {
            this.listeners[name].forEach((listener) => {
                const response = listener(data);
                if (response) responseFromListeners.push(response);
            });
            return responseFromListeners;
        }
    }
}

export default FormEventsEmitter;
