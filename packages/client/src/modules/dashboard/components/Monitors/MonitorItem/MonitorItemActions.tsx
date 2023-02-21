import React from 'react';

import {
  RiPauseLine,
  RiPlayLine,
  RiCloseLine,
  RiSettings3Line,
  RiLink,
} from 'react-icons/ri';

const MonitorItemActions = () => {
  return (
    <div className="flex flex-row gap-0 bg-[white] rounded-[4px] items-center justify-between p-1">
      <button className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500">
        <RiLink className="text-[21px]" />
      </button>
      <button className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500">
        <RiCloseLine className="text-[19px]" />
      </button>
      {/* <button className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500">
        <RiPlayLine className="text-[19px]" />
      </button> */}
      <button className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500">
        <RiPauseLine className="text-[19px]" />
      </button>
      <button className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500">
        <RiSettings3Line className="text-[19px]" />
      </button>
    </div>
  );
};

export default React.memo(MonitorItemActions);
