import { Express } from 'express';
import Http from 'http';
import { Server as SocketServer } from 'socket.io';

import config from '../config';
import logger from '../logger';

let io: SocketServer;

export default (app: Express) => {
  const server = Http.createServer(app);

  io = new SocketServer(server, {
    cors: {
      origin: config.clientUrl,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);
    // @ts-ignore
    logger.info(`Connected sockets: ${Object.keys(io.engine.clients).length}`);
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });

  return [server, io] as const;
};

export { io };
