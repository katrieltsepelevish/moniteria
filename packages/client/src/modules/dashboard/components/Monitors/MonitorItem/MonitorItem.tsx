import React from 'react';

import MonitorItemActions from './MonitorItemActions';
import MonitorItemChart from './MonitorItemChart';

const MonitorItem = () => {
  return (
    <div className="m-2 bg-[#f2f2f2] rounded-[4px]">
      <div className="p-3 flex flex-row justify-between items-center">
        <h4 className="font-semibold text-[17px]">Google.com</h4>
        <MonitorItemActions />
      </div>
      <MonitorItemChart />
    </div>
  );
};

export default React.memo(MonitorItem);
