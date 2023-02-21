import ClassNames from 'classnames';
import React from 'react';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
  darkMode?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  darkMode = false,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'flex items-center flex-row gap-1 uppercase py-2 px-4 rounded-[4px] transition-all duration-500',
        {
          'text-white bg-[#18181B] hover:bg-[#555555]': darkMode,
          'bg-white hover:bg-[#e4e4e4]': !darkMode,
        },
        className
      ),
    [darkMode]
  );

  return (
    <button className={classes} {...props}>
      {icon}
      <span className="text-[14px] font-semibold">{label}</span>
    </button>
  );
};

export default IconButton;
