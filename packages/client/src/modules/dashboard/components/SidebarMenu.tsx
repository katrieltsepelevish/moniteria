import React from 'react';

import { RiHome5Line, RiSettings3Line, RiLogoutBoxLine } from 'react-icons/ri';
import { useLogoutUserMutation } from '../../../services/auth/authApi';

import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => {
  const [userLogout] = useLogoutUserMutation();

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center justify-between w-full">
        <SidebarMenuItem
          active
          icon={<RiHome5Line className="text-[24px]" />}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        {/* Logout user  */}
        <SidebarMenuItem
          icon={<RiLogoutBoxLine className="text-[24px]" />}
          onClick={userLogout}
        />
        <SidebarMenuItem icon={<RiSettings3Line className="text-[24px]" />} />
      </div>
    </div>
  );
};

export default React.memo(SidebarMenu);
