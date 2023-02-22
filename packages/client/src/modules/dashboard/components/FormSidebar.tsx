import React from 'react';

import { RiCloseLine } from 'react-icons/ri';

import { useFormSidebarContext } from '../../../contexts/FormSidebarContext';
import AddMonitorForm from './Form/AddMonitorForm';
import EditMonitorForm from './Form/EditMonitorForm';

const FormSidebar = () => {
  const { isOpen, editMode, setOpen } = useFormSidebarContext();

  if (!isOpen) return <></>;

  return (
    <div className="h-full w-full max-w-[400px] p-3 border-r bg-[#fbfbfb]">
      <div className="flex flex-items justify-between">
        <h3 className="font-semibold text-[18px]">
          {editMode ? 'Edit Monitor' : 'Add Monitor'}
        </h3>
        <button
          className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500"
          onClick={() => setOpen(false)}
        >
          <RiCloseLine className="text-[19px]" />
        </button>
      </div>
      <div className="mt-2 text-[12px] text-[#989898]">
        {editMode ? (
          <span>
            Fill out the form below to update the configurion of the requested
            monitor
          </span>
        ) : (
          <span>
            Fill out the form below to configure an additional monitoring
            service for a website
          </span>
        )}
      </div>
      {editMode ? <EditMonitorForm /> : <AddMonitorForm />}
    </div>
  );
};

export default React.memo(FormSidebar);
