import { io } from './setup/socket';
import PingMonitor from './PingMonitor';
import Monitor, { MonitorDocument } from './models/monitor';

export default class PingMonitorsManager {
  public static _instance: PingMonitorsManager;

  private monitors: PingMonitor[] = [];

  add(monitor: PingMonitor) {
    this.monitors.push(monitor);
  }

  findById(id: string) {
    return this.monitors.find(
      (monitor) => monitor.getId().toString() === id.toString()
    );
  }

  updateById(id: string, monitor: MonitorDocument) {
    const existingMonitor = this.findById(id);

    if (!existingMonitor) {
      return;
    }

    this.monitors.forEach((pingMonitor: PingMonitor) => {
      if (pingMonitor.getId() === existingMonitor.getId()) {
        pingMonitor.updateMonitor(monitor);
      }
    });
  }

  async startById(id: string) {
    const existingMonitor = this.findById(id);

    if (existingMonitor) {
      existingMonitor.start(io);
      return;
    }

    const newMonitor = await Monitor.findById(id);

    const newPingMonitor = new PingMonitor(newMonitor!);
    newPingMonitor.start(io);
    this.add(newPingMonitor);

    return;
  }

  stopById(id: string) {
    const existingMonitor = this.findById(id);

    if (existingMonitor) {
      existingMonitor.stop();
    }
  }

  stopAll() {
    this.monitors.forEach((monitor) => monitor.stop());
    return;
  }
}

export const pingMonitorsManager = () => {
  if (!PingMonitorsManager._instance) {
    PingMonitorsManager._instance = new PingMonitorsManager();
  }

  return PingMonitorsManager._instance;
};
