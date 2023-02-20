import React from 'react';

import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />
      <div className="w-full h-full">
        <div className="border-b w-full p-3">
          <h2 className="font-black text-[21px]">Dashboard</h2>
        </div>
        <div className="p-3 w-full h-full uppercase"></div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
