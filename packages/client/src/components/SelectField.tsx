import React from 'react';
import ClassNames from 'classnames';

interface IOption {
  name: string;
  value: string | number;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: IOption[];
  fullWidth?: boolean;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  fullWidth = true,
  className,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      ClassNames(
        'bg-white w-full border p-2 rounded-sm mt-1 text-[14px] focus:border-[black] outline-none',
        { 'w-full': fullWidth },
        className
      ),
    [className, fullWidth]
  );

  return (
    <div>
      <label htmlFor={label} className="uppercase text-[12px] font-black">
        {label}
      </label>
      <select className={classes} {...props}>
        {options.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
