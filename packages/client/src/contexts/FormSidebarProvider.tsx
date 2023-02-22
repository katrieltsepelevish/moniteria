import React from 'react';

import FormSidebarContext from './FormSidebarContext';

interface FormSidebarProviderProps {
  children: React.ReactNode;
}

const FormSidebarProvider: React.FC<FormSidebarProviderProps> = ({
  children,
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [selectedMonitor, setSelectedMonitor] = React.useState('');

  const toggle = () => setOpen(!isOpen);

  const contextMemo = React.useMemo(
    () => ({
      editMode,
      isOpen,
      selectedMonitor,
      setEditMode,
      setOpen,
      setSelectedMonitor,
      toggle,
    }),
    [editMode, isOpen, selectedMonitor, toggle]
  );

  return (
    <FormSidebarContext.Provider value={contextMemo}>
      {children}
    </FormSidebarContext.Provider>
  );
};

export default FormSidebarProvider;
