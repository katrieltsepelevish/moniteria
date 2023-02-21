import React from 'react';

import { RiPulseFill } from 'react-icons/ri';

import MenuNavigation from './MenuNavigation/MenuNavigation';

const SidebarMenu = () => (
  <div className="flex flex-col max-w-[60px] w-full h-full items-center border-r justify-between">
    {/* Logo */}
    <div className="border-b p-3 w-full items-center justify-center flex bg-[#f2f2f2]">
      <button>
        <div className="text-[#212529] rounded-[4px]">
          <RiPulseFill className="text-[31.5px]" />
        </div>
      </button>
    </div>
    <MenuNavigation />
  </div>
);

export default React.memo(SidebarMenu);
