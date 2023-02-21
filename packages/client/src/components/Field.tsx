import ClassNames from 'classnames';
import React from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
  error?: string;
  className?: string;
}

const Field: React.FC<FieldProps> = ({
  label,
  fullWidth = true,
  error,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'bg-white w-full border p-2 rounded-sm mt-1 text-[14px] focus:border-[black] outline-none',
        { 'w-full': fullWidth, '!border-[#da3b3b]': Boolean(error) },
        className
      ),
    [className, error, fullWidth]
  );

  return (
    <>
      <div>
        <label htmlFor={label} className="uppercase text-[12px] font-black">
          {label}
        </label>
        <input className={classes} {...props} />
      </div>
      {error && <span className="text-[12px] text-[#da3b3b]">{error}</span>}
    </>
  );
};

export default Field;
