import React from 'react';

import {
  RiPauseLine,
  RiPlayLine,
  RiCloseLine,
  RiSettings3Line,
  RiLink,
} from 'react-icons/ri';

import {
  MonitorState,
  useUpdateMonitorMutation,
} from '../../../../../services/monitor/monitorApi';

interface MonitorItemActionsProps {
  monitor: MonitorState;
}

const MonitorItemActions: React.FC<MonitorItemActionsProps> = ({ monitor }) => {
  const [updateMonitor] = useUpdateMonitorMutation();

  const handleMonitorActivation = async () => {
    await updateMonitor({
      _id: monitor._id,
      active: !monitor.active,
    });
  };

  return (
    <div className="flex flex-row gap-0 bg-[white] rounded-[4px] items-center justify-between p-1">
      <a target="_blank" href={monitor?.uri} className="icon-btn">
        <RiLink className="text-[21px]" />
      </a>
      <button className="icon-btn">
        <RiCloseLine className="text-[19px]" />
      </button>
      {monitor?.active ? (
        <button className="icon-btn" onClick={handleMonitorActivation}>
          <RiPauseLine className="text-[19px]" />
        </button>
      ) : (
        <button className="icon-btn" onClick={handleMonitorActivation}>
          <RiPlayLine className="text-[19px]" />
        </button>
      )}
      <button className="icon-btn">
        <RiSettings3Line className="text-[19px]" />
      </button>
    </div>
  );
};

export default React.memo(MonitorItemActions);
