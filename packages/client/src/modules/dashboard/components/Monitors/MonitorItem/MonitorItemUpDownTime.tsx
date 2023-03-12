import React from 'react';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

import { MonitorState } from '../../../../../services/monitor/monitorApi';

interface MonitorItemUpDownTimeProps {
  monitor: MonitorState;
}

const MonitorItemUpDownTime: React.FC<MonitorItemUpDownTimeProps> = ({
  monitor,
}) => {
  return (
    <div className="p-2 flex flex-row items-end gap-2">
      {monitor.reachable ? (
        <div className="flex flex-row items-center gap-2">
          <RiArrowUpLine className="text-[#03c603]" />
          <div className="flex flex-row items-end gap-2">
            <span>Uptime</span>
            <small className="text-gray-500">
              {monitor.uptime.toPrecision(4)}s
            </small>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <RiArrowDownLine className="text-[#e20000]" />
          <div className="flex flex-row items-end gap-2">
            <span>Downtime</span>
            <small>{monitor.downtime.toPrecision(4)}s</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MonitorItemUpDownTime);
