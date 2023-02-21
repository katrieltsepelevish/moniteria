import React from 'react';

import { MonitorState } from '../../../../../services/monitor/monitorApi';
import MonitorItemActions from './MonitorItemActions';
import MonitorItemChart from './MonitorItemChart';

interface MonitorItemProps {
  monitor: MonitorState;
}

const MonitorItem: React.FC<MonitorItemProps> = ({ monitor }) => {
  return (
    <div className="m-2 bg-[#f2f2f2] rounded-[4px]">
      <div className="p-3 flex flex-row justify-between items-center">
        <h4 className="font-semibold text-[17px]">{monitor.name}</h4>
        <MonitorItemActions monitor={monitor} />
      </div>
      <MonitorItemChart />
    </div>
  );
};

export default React.memo(MonitorItem);
