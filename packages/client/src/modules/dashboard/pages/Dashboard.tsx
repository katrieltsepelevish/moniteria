import React from 'react';

import FormSidebarProvider from '../../../contexts/FormSidebarProvider';
import FormSidebar from '../components/FormSidebar';
import Monitors from '../components/Monitors/Monitors';
import SidebarMenu from '../components/SidebarMenu';

const Dashboard = () => {
  return (
    <FormSidebarProvider>
      <div className="flex flex-row w-full h-screen">
        <SidebarMenu />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between border-b w-full p-3">
            <div className="flex flex-row items-baseline gap-2">
              <h2 className="font-black text-[21px] uppercase">Dashboard</h2>
              <small className="text-[12px] text-[#b2b2b2]">v0.0.0</small>
            </div>
          </div>
          <div className="block w-full h-full">
            <div className="flex flex-row h-full">
              <FormSidebar />
              <div className="h-full w-full p-3">
                <Monitors />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormSidebarProvider>
  );
};

export default React.memo(Dashboard);
