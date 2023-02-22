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

interface MonitorsProps {
  toggleForm: () => void;
}

const socket = getSocket();

type HeartbeatsType = { [key: string]: HeartbeatState[] };

const Monitors: React.FC<MonitorsProps> = ({ toggleForm }) => {
  const { data } = useGetAllMonitorsQuery(null);

  const monitors = React.useMemo(() => data?.monitors, [data]);

  const [heartbeats, setHeartbeats] = React.useState<HeartbeatsType>({});

  React.useEffect(() => {
    socket.emit('initialHeartbeats', true);

    socket.on('heartbeat', (beat: HeartbeatState) => {
      setHeartbeats((prevHeartbeats: HeartbeatsType) => {
        const monitorId = String(beat!.monitorId);

        const newHeartbeats = {
          ...prevHeartbeats,
          [monitorId]: [...(prevHeartbeats[monitorId] || []), beat],
        };

        return newHeartbeats;
      });
    });

    return () => {
      socket.off('heartbeat');
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

              const heartbeat: HeartbeatState[] = heartbeats[monitorId] ?? [];

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
          <AddMonitorItem onClick={toggleForm} />
        )}
      </div>

      <AddMonitorButton onClick={toggleForm} />
    </div>
  );
};

export default React.memo(Monitors);
