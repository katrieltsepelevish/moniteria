import React from 'react';
import ClassNames from 'classnames';

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  active?: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  active = false,
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'flex p-3 w-full items-center justify-center relative hover:bg-[#f2f2f2] transition-all duration-500',
        {
          'bg-black border-black text-white': active,
        }
      ),
    [active]
  );

  return (
    <button className="block w-full">
      <div className={classes}>{icon}</div>
    </button>
  );
};

export default React.memo(SidebarMenuItem);
