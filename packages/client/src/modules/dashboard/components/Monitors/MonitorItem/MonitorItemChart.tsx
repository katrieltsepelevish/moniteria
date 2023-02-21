import React from 'react';

import MonitorItemChartPulse from './MonitorItemChartPulse';

const MonitorItemChart = () => {
  return (
    <div className="mt-6 flex flex-row gap-[2px] h-[60px] items-end">
      <MonitorItemChartPulse percentage={10} failed={false} />
      <MonitorItemChartPulse percentage={40} failed={true} />
      <MonitorItemChartPulse percentage={30} failed={false} />
      <MonitorItemChartPulse percentage={50} failed={false} />
      <MonitorItemChartPulse percentage={70} failed={false} />
      <MonitorItemChartPulse percentage={30} failed={false} />
      <MonitorItemChartPulse percentage={100} failed={true} />
      <MonitorItemChartPulse percentage={50} failed={false} />
      <MonitorItemChartPulse percentage={40} failed={false} />
      <MonitorItemChartPulse percentage={10} failed={true} />
      <MonitorItemChartPulse percentage={30} failed={false} />
      <MonitorItemChartPulse percentage={50} failed={false} />
    </div>
  );
};

export default React.memo(MonitorItemChart);
