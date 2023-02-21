import React from 'react';

import AddMonitorItem from './AddMonitorItem';
import AddMonitorButton from './AddMonitorButton';
import MonitorItem from './MonitorItem/MonitorItem';
import {
  MonitorState,
  useGetAllMonitorsQuery,
} from '../../../../services/monitor/monitorApi';

interface MonitorsProps {
  toggleForm: () => void;
}

const Monitors: React.FC<MonitorsProps> = ({ toggleForm }) => {
  const { data } = useGetAllMonitorsQuery(null);

  const monitors = React.useMemo(() => data?.monitors, [data]);

  return (
    <div>
      <div className="grid grid-cols-4">
        {monitors && monitors.length > 0 ? (
          <>
            {monitors.map((monitor: MonitorState) => (
              <MonitorItem monitor={monitor} key={monitor._id} />
            ))}
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
