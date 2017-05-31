class Storage {
    constructor(model) {
        this.model = model || {};
        this.listeners = [];
    }
    set(name, value, callback) {
        this.model[name] = value;
        this.listeners.forEach(listener => listener(this.model, callback));
    }
    setModel(model, callback) {
        this.model = model;
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