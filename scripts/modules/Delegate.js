class Delegate {
    #listeners = [];

    addListener = function (newListener){
        listeners.push(newListener);
    }

    removeListener = function (listener){
        if(listeners.contains(listener)) {
            listeners.remove(listener);
        }
    }

    invoke = function (arguments) {
        for(let i = 0; i < listeners.length; i++) {
            listeners[i](arguments);
        }
    }
}