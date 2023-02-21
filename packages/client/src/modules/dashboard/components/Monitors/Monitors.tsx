import React from 'react';

import AddMonitorItem from './AddMonitorItem';
import AddMonitorButton from './AddMonitorButton';

import MonitorItem from './MonitorItem/MonitorItem';

interface MonitorsProps {
  toggleForm: () => void;
}

const Monitors: React.FC<MonitorsProps> = ({ toggleForm }) => {
  return (
    <div>
      <div className="grid grid-cols-4">
        <AddMonitorItem onClick={toggleForm} />

        {/* Monitors */}
        <MonitorItem />
        <MonitorItem />
        <MonitorItem />
        <MonitorItem />
        <MonitorItem />
        <MonitorItem />
      </div>

      <AddMonitorButton onClick={toggleForm} />
    </div>
  );
};

export default React.memo(Monitors);
