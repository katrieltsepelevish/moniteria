import React from 'react';

import { RiAddLine } from 'react-icons/ri';

const AddMonitorItem = ({ ...props }) => (
  <div
    className="flex flex-row items-center justify-center m-2 bg-[#f2f2f2] rounded-[4px] cursor-pointer hover:bg-[#d8d8d8] transition-all duration-500"
    {...props}
  >
    <div className="flex flex-row items-center gap-2">
      <RiAddLine className="text-[26px]" />
      <span className="font-semibold text-[21px]">Add Monitor</span>
    </div>
  </div>
);

export default React.memo(AddMonitorItem);
