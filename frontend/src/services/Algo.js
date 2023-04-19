export default class Algo {
  constructor (transport) {
    this._transport = transport;
  }

  create (nodes, params) {
    this._transport.postMessage('create', [nodes, params]);
  }

  getSolution () {
    this._transport.postMessage('getSolution');
  }

  removeOnSolution(listener) {
    this._transport.removeListener('solution', listener);
  }

  setParam(name, value) {
    this._transport.postMessage('setParam', [name, value]);
  }

  start (nodes, params) {
    this._transport.postMessage('start');
  }

  stop (nodes, params) {
    this._transport.postMessage('stop');
  }

  onCreated (listener) {
    this._transport.on('created', listener);
  }

  onDone (listener) {
    this._transport.on('done', listener);
  }

  onSolution (listener) {
    this._transport.on('solution', listener);
  }

  onStarted (listener) {
    this._transport.on('started', listener);
  }

  onStopped (listener) {
    this._transport.on('stopped', listener);
  }
}
