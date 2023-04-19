export default class WorkerTransport {
    constructor (worker) {
      this._worker = worker;
      this._listeners = new Map();
      this._worker.onmessage = this._onmessage.bind(this);
    }
  
    on (eventName, listener) {
      let listeners = this._listeners.get(eventName);
      if (typeof listeners === 'undefined') {
        listeners = new Set();
        this._listeners.set(eventName, listeners);
      }
  
      listeners.add(listener);
    }
  
    postMessage(name, args) {
      this._worker.postMessage({
        name: name,
        args: args
      });
    }
  
    removeListener (eventName, listener) {
      let listeners = this._listeners.get(eventName);
      if (typeof listeners === 'undefined') {
        return;
      }
  
      listeners.delete(listener);
    }
  
    _onmessage (event) {
      let listeners = this._listeners.get(event.data.name);
      if (typeof listeners !== 'undefined') {
        listeners.forEach(l => l.apply(null, event.data.args));
      }
    }
  }