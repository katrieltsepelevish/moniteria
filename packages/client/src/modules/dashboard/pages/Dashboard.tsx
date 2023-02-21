import React from 'react';

import { RiAddFill } from 'react-icons/ri';
import IconButton from '../../../components/IconButton';

import FormSidebar from '../components/FormSidebar/FormSidebar';
import Monitors from '../components/Monitors/Monitors';
import SidebarMenu from '../components/SidebarMenu';

const Dashboard = () => {
  const [showForm, setShowForm] = React.useState(false);

  return (
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
            <FormSidebar open={showForm} onClose={() => setShowForm(false)} />
            <div className="h-full w-full p-3">
              <Monitors toggleForm={() => setShowForm(!showForm)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
