import React from 'react';
import ClassNames from 'classnames';

interface MenuNavigationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  active?: boolean;
  className?: string;
}

const MenuNavigationItem: React.FC<MenuNavigationItemProps> = ({
  icon,
  active = false,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'flex p-3 w-full items-center justify-center relative hover:bg-[#f2f2f2] hover:text-black transition-all duration-500',
        {
          'bg-black border-black text-white': active,
        },
        className
      ),
    [active, className]
  );

  return (
    <button className="block w-full" {...props}>
      <div className={classes}>{icon}</div>
    </button>
  );
};

export default React.memo(MenuNavigationItem);
