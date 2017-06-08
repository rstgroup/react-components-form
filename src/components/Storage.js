class Storage {
    constructor(model) {
        this.model = model || {};
        this.listeners = [];
    }
    set(name, value, callback, runWithoutListeners) {
        this.model[name] = value;
        if (runWithoutListeners) return;
        this.listeners.forEach(listener => listener(this.model, callback));
    }
    setModel(model, callback, runWithoutListeners) {
        this.model = model;
        if (runWithoutListeners) return;
        this.listeners.forEach(listener => listener(this.model, callback));
    }
    listen(listener) {
        this.listeners.push(listener);
    }
    unlisten(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) this.listeners.splice(index, 1);
    }
}

export default Storage;