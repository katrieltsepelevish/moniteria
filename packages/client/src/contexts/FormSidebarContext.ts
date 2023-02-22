import React from 'react';

interface FormSidebarContextProps {
  editMode: boolean;
  isOpen: boolean;
  selectedMonitor: string;
  setEditMode: (editMode: boolean) => void;
  setOpen: (isOpen: boolean) => void;
  setSelectedMonitor: (selectedMonitor: string) => void;
  toggle: () => void;
}

const FormSidebarContext = React.createContext<FormSidebarContextProps>({
  editMode: false,
  isOpen: false,
  selectedMonitor: '',
  setEditMode: () => {},
  setOpen: () => {},
  setSelectedMonitor: () => {},
  toggle: () => {},
});

export const useFormSidebarContext = () => React.useContext(FormSidebarContext);

export default FormSidebarContext;
