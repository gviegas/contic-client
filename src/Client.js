//
// Created by Gustavo Viegas on 2017/02
//

import io from 'socket.io-client';

class Client {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(addr = 'http://localhost:4080/') {
    if(this.connected) {
      console.log('Already connected');
      return;
    }

    // eslint-disable-next-line
    this.socket = io(addr);

    this.socket.on('connect', () => {
      this.socket.on('disconnect', () => {
        this.connected = false;
        console.log('Disconnected');
      });
      this.connect = true;
      console.log('Connected');
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
