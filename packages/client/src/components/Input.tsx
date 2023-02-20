import React from 'react';
import ClassNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  fullWidth = true,
  error,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'min-h-[42px] h-auto text-[15px] px-[12px] pt-[18px] rounded-[4px] leading-[40px] text-[black] bg-[#f1f3f5] focus:outline-none border border-[#f1f3f5] focus:border-[#2C2E33]',
        { 'w-full': fullWidth, '!border-[#da3b3b]': Boolean(error) },
        className
      ),
    [fullWidth, className, error]
  );

  return (
    <>
      <div className="block">
        <label
          htmlFor={label}
          className="absolute pt-[6px] pl-[12px] pointer-events-none text-[#212529] text-[12px] opacity-[0.95] font-semibold"
        >
          {label?.toUpperCase()}
        </label>
        <input name={label} className={classes} {...props} />
      </div>
      {error && <span className="text-[12px] text-[#da3b3b]">{error}</span>}
    </>
  );
};

export default React.memo(Input);
