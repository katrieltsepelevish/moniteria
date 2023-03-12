import React from 'react';

import AddMonitorItem from './AddMonitor/AddMonitorItem';
import AddMonitorButton from './AddMonitor/AddMonitorButton';
import MonitorItem from './MonitorItem/MonitorItem';
import {
  MonitorState,
  useGetAllMonitorsQuery,
} from '../../../../services/monitor/monitorApi';
import { getSocket } from '../../../../lib/socket';
import { HeartbeatState } from '../Heartbeat/Heartbeat';
import { useFormSidebarContext } from '../../../../contexts/FormSidebarContext';

const socket = getSocket();

type HeartbeatsType = { [key: string]: HeartbeatState[] };

const Monitors = () => {
  const { setOpen, setEditMode } = useFormSidebarContext();

  const { data } = useGetAllMonitorsQuery(null);

  const [monitors, setMonitors] = React.useState<MonitorState[]>([]);

  React.useEffect(() => {
    if (data?.monitors) {
      setMonitors(data?.monitors);
    }
  }, [data]);

  const [heartbeats, setHeartbeats] = React.useState<HeartbeatsType>({});

  React.useEffect(() => {
    socket.emit('initialHeartbeats', true);

    socket.on('heartbeat', (beat: HeartbeatState) => {
      setHeartbeats((prevHeartbeats: HeartbeatsType) => {
        const monitorId = String(beat!.monitorId);

        const existingBeat = prevHeartbeats[monitorId]?.find(
          (heartbeat: HeartbeatState) => heartbeat._id === beat._id
        );

        if (!existingBeat) {
          const newHeartbeats = {
            ...prevHeartbeats,
            [monitorId]: [...(prevHeartbeats[monitorId] || []), beat],
          };

          return newHeartbeats;
        }

        return prevHeartbeats;
      });
    });

    socket.on('monitor', (monitor: MonitorState) => {
      setMonitors((prevMonitors: MonitorState[]) =>
        prevMonitors.find(
          (prevMonitor: MonitorState) => prevMonitor._id === monitor._id
        )
          ? prevMonitors.map((prevMonitor: MonitorState) =>
              prevMonitor._id === monitor._id ? monitor : prevMonitor
            )
          : [...prevMonitors, monitor]
      );
    });

    return () => {
      socket.off('heartbeat');
      socket.off('monitor');
    };
  }, []);

  return (
    <div>
      {/* Monitors grid */}
      <div className="grid grid-cols-4">
        {monitors && monitors.length > 0 ? (
          <>
            {monitors.map((monitor: MonitorState) => {
              const monitorId = String(monitor!._id);

              const heartbeat: HeartbeatState[] =
                heartbeats[monitorId]?.sort(
                  (a: HeartbeatState, b: HeartbeatState) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                ) ?? [];

              console.log({ heartbeat });

              return (
                <MonitorItem
                  monitor={monitor}
                  key={monitor._id}
                  heartbeat={heartbeat}
                />
              );
            })}
          </>
        ) : (
          <AddMonitorItem
            onClick={() => {
              setEditMode(false);
              setOpen(true);
            }}
          />
        )}
      </div>

      <AddMonitorButton
        onClick={() => {
          setEditMode(false);
          setOpen(true);
        }}
      />
    </div>
  );
};

export default React.memo(Monitors);
