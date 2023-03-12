import React from 'react';

import { RiAddLine } from 'react-icons/ri';

interface AddMonitorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddMonitorButton: React.FC<AddMonitorButtonProps> = ({ ...props }) => (
  <div>
    <button
      className="fixed bottom-0 right-0 m-4 p-2 bg-[#dedede] hover:bg-[#eeeeee] rounded-full z-10 shadow-sm transition-all duration-500 outline-none"
      {...props}
    >
      <RiAddLine className="text-[26px]" />
    </button>
  </div>
);

export default React.memo(AddMonitorButton);
