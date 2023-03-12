import React from 'react';

import { MonitorState } from '../../../../../services/monitor/monitorApi';
import MonitorItemActions from './MonitorItemActions';
import Heartbeat, { HeartbeatState } from '../../Heartbeat/Heartbeat';
import MonitorItemUpDownTime from './MonitorItemUpDownTime';

interface MonitorItemProps {
  monitor: MonitorState;
  heartbeat: HeartbeatState[];
}

const MonitorItem: React.FC<MonitorItemProps> = ({ monitor, heartbeat }) => {
  return (
    <div className="m-2 bg-[#f2f2f2] rounded-[4px]">
      <div className="p-3 flex flex-row justify-between items-center">
        <h4 className="font-semibold text-[17px]">{monitor.name}</h4>
        <MonitorItemActions monitor={monitor} />
      </div>
      <MonitorItemUpDownTime monitor={monitor} />
      <Heartbeat heartbeat={heartbeat} />
    </div>
  );
};

export default React.memo(MonitorItem);
