import { Server as SocketServer } from 'socket.io';

import Monitor from '../models/monitor';
import { pingMonitorsManager } from '../PingMonitorsManager';
import Heartbeat, { HeartbeatState } from '../models/heartbeat';
import logger from '../logger';

export default async (io: SocketServer) => {
  const monitors = await Monitor.find({ active: true });

  monitors.forEach((monitor) => {
    pingMonitorsManager().startById(monitor._id);
  });

  io.on('connection', (socket) => {
    socket.on('initialHeartbeats', async () => {
      try {
        const monitorsHeartbeats = await Heartbeat.aggregate([
          { $sort: { createdAt: -1 } },
          { $group: { _id: '$monitorId', results: { $push: '$$ROOT' } } },
          {
            $project: {
              _id: 0,
              monitorId: '$_id',
              heartbeats: { $slice: ['$results', 20] },
            },
          },
        ]);

        monitorsHeartbeats.forEach(({ heartbeats }) =>
          heartbeats.forEach((heartbeat: HeartbeatState) =>
            socket.emit('heartbeat', heartbeat)
          )
        );
      } catch (err) {
        logger.error(err);
      }
    });
  });
};
