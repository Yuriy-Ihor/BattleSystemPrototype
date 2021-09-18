class Delegate {
    listeners = [];

    constructor() {
        this.listeners = [];
    }

    addListener = function(newListener) {
        this.listeners.push(newListener);
    }

    removeListener = function(listener) {
        if(this.listeners.contains(listener)) {
            this.listeners.remove(listener);
        }
    }

    invoke = function(argument) {
        if(this.listeners.length == 0) {
            return;
        }

        for(let i = 0; i < this.listeners.length; i++) {
            this.listeners[i](argument);
        }
    }
}