import ClassNames from 'classnames';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  darkMode?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  darkMode = false,
  fullWidth = true,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'btn',
        {
          'bg-[#25262B] hover:bg-[#1A1B1E] text-[white]': darkMode,
          'w-full': fullWidth,
        },
        className
      ),
    [className, fullWidth, darkMode]
  );

  return (
    <button className={classes} {...props}>
      {icon ? (
        <div className="flex items-center justify-center gap-2">
          {icon}
          <span>{text}</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default React.memo(Button);
