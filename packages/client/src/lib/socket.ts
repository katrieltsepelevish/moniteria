import io, { Socket } from 'socket.io-client';

import config from '../config';

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(config.socketUrl);
  }
  return socket;
};
