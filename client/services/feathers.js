import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

import reduxifyServices from 'feathers-redux';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

const url = foi.server;

const socket = io(url);

const client = feathers();
client.configure(hooks());
client.configure(socketio(socket));
client.configure(authentication({
  storage: window.localStorage
}));

export const auth = reduxifyAuthentication(client);
export default client;
