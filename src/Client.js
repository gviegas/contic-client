//
// Created by Gustavo Viegas on 2017/02
//

const serverAddr = 'http://localhost/';

const MESSAGE = Object.freeze({
  type: {
    query: 'query',
    insert: 'insert',
    delete: 'delete',
  }
});

class Client {
  constructor() {
    // let script = document.createElement('script');
    // script.src = 'http://localhost/socket.io/socket.io.js';
    // document.body.appendChild(script);
    this.socket = null;
    this.connected = false;
  }

  connect(addr = serverAddr) {
    if(this.connected) {
      console.log('already connected');
      return;
    }

    // eslint-disable-next-line
    this.socket = io(addr);

    this.socket.on('connect', () => {
      this.socket.on('message', (d) => {
        console.log('Message Received:');
        console.log(d);
      });

      this.socket.on('disconnect', () => {
        this.connected = false;
        console.log('disconnected');
      });

      this.connect = true;
      console.log('connected');
    });
  }

  send(d) {
    this.socket.send(d);
  }

  onEvent(name, callback) {
    this.socket.on(name, callback);
  }

  removeEvent(name, listener = null) {
    if(listener)
      this.socket.removeListener(name, listener);
    else
      this.socket.removeAllListeners(name);
  }
}

const client = new Client();
client.connect();

export default client;
