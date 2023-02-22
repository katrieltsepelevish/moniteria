import Axios from 'axios';
import { Server as SocketServer } from 'socket.io';

import { MonitorDocument } from './models/monitor';
import Heartbeat, { HeartbeatState } from './models/heartbeat';
import logger from './logger';

class PingMonitor {
  private monitor: MonitorDocument;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private io: SocketServer | null = null;

  constructor(monitor: MonitorDocument) {
    this.monitor = monitor;
  }

  start(io: SocketServer) {
    logger.info(`Monitor ${this.monitor._id} started`);

    this.heartbeatInterval = setInterval(
      () => this.pinger(),
      Number(this.monitor.heartbeatInterval) * 1000
    );

    this.io = io;
  }

  stop(silent: boolean = false) {
    clearInterval(this.heartbeatInterval!);
    this.heartbeatInterval = null;

    if (!silent) {
      logger.info(`Monitor ${this.monitor._id} stopped`);
    }
  }

  pinger = async () => {
    const startTime = Date.now();

    // @ts-ignore
    const heartbeat: HeartbeatState = {};

    heartbeat.monitorId = this.monitor.id;

    try {
      const { status, statusText } = await Axios.get(String(this.monitor.uri), {
        timeout: 5 * 1000,
      });

      heartbeat.status = status;
      heartbeat.statusText = statusText;
      heartbeat.down = false;
      logger.info(`🟢 Monitor ${this.monitor._id} ping succeeded`);
    } catch (err: any) {
      heartbeat.status = Number.isInteger(err.code) ? err.code : 500;
      heartbeat.statusText = err.message || 'Unknown error';
      heartbeat.down = true;
      logger.info(`🔴 Monitor ${this.monitor._id} ping failed`);
    } finally {
      const finishTime = Date.now();
      const durationInSeconds = (finishTime - startTime) / 1000;
      heartbeat.duration = durationInSeconds;

      this.stop(true);
    }

    this.io!.emit('heartbeat', heartbeat);

    await Heartbeat.create({ ...heartbeat });

    this.heartbeatInterval = setInterval(
      () => this.pinger(),
      Number(this.monitor.heartbeatInterval) * 1000
    );
  };

  getId() {
    return this.monitor._id;
  }
}

export default PingMonitor;
