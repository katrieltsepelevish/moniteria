import React from 'react';

import { RiHome5Line, RiSettings3Line } from 'react-icons/ri';

import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => (
  <div className="flex flex-col items-center justify-between h-full w-full">
    <div className="flex flex-col items-center justify-between w-full">
      <SidebarMenuItem active icon={<RiHome5Line className="text-[24px]" />} />
    </div>
    <div className="flex flex-col items-center justify-between w-full">
      <SidebarMenuItem icon={<RiSettings3Line className="text-[24px]" />} />
    </div>
  </div>
);

export default React.memo(SidebarMenu);
