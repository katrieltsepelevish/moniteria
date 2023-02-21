import React from 'react';

import { RiCloseLine } from 'react-icons/ri';

import AddMonitorForm from './Form/AddMonitorForm';

interface FormSidebarProps {
  open: boolean;
  onClose: () => void;
}

const FormSidebar: React.FC<FormSidebarProps> = ({ open, onClose }) => {
  if (!open) return <></>;

  return (
    <div className="h-full w-full max-w-[400px] p-3 border-r bg-[#fbfbfb]">
      <div className="flex flex-items justify-between">
        <h3 className="font-semibold text-[18px]">Add Monitor</h3>
        <button
          className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500"
          onClick={onClose}
        >
          <RiCloseLine className="text-[19px]" />
        </button>
      </div>
      <div className="mt-2 text-[12px] text-[#989898]">
        <span>
          Fill out the form below to configure an additional monitoring service
          for a website
        </span>
      </div>
      <AddMonitorForm />
    </div>
  );
};

export default React.memo(FormSidebar);
