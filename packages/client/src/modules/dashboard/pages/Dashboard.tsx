import React from 'react';

import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />
      <div className="w-full h-full">
        <div className="flex items-center justify-between border-b w-full p-3">
          <h2 className="font-black text-[21px]">Dashboard</h2>
          <small className="text-[12px] text-[#b2b2b2]">v0.0.0</small>
        </div>
        <div className="p-3 w-full h-full uppercase"></div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
