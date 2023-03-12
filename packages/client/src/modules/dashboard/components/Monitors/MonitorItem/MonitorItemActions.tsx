import React from 'react';

import {
  RiPauseLine,
  RiPlayLine,
  RiCloseLine,
  RiSettings3Line,
  RiLink,
} from 'react-icons/ri';

import { useFormSidebarContext } from '../../../../../contexts/FormSidebarContext';
import {
  MonitorState,
  useDeleteMonitorMutation,
  useUpdateMonitorMutation,
} from '../../../../../services/monitor/monitorApi';
import DeleteMonitorModal from '../../Modal/DeleteMonitorModal';

interface MonitorItemActionsProps {
  monitor: MonitorState;
}

const MonitorItemActions: React.FC<MonitorItemActionsProps> = ({ monitor }) => {
  const [updateMonitor] = useUpdateMonitorMutation();
  const [deleteMonitor] = useDeleteMonitorMutation();

  const { selectedMonitor, setEditMode, setSelectedMonitor, setOpen } =
    useFormSidebarContext();

  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);

  const handleMonitorActivation = async () => {
    await updateMonitor({
      _id: monitor._id,
      active: !monitor.active,
    });
  };

  const handleMonitorEdit = (id: string) => {
    setEditMode(true);
    setSelectedMonitor(id);
    setOpen(true);
  };

  const handleMonitorDelete = async (id: string) => {
    await deleteMonitor(id);

    if (selectedMonitor === id) {
      setEditMode(false);
      setSelectedMonitor('');
    }
  };

  return (
    <div className="flex flex-row gap-0 bg-[white] rounded-[4px] items-center justify-between p-1">
      {/* Monitor link button */}
      <a target="_blank" href={monitor?.uri} className="icon-btn">
        <RiLink className="text-[21px]" />
      </a>

      {/* Delete button */}
      <button className="icon-btn" onClick={() => setShowDeleteModal(true)}>
        <RiCloseLine className="text-[19px]" />
      </button>

      {/* Pause / Resume buttons  */}
      {monitor?.active ? (
        <button className="icon-btn" onClick={handleMonitorActivation}>
          <RiPauseLine className="text-[19px]" />
        </button>
      ) : (
        <button className="icon-btn" onClick={handleMonitorActivation}>
          <RiPlayLine className="text-[19px]" />
        </button>
      )}

      {/* Edit button  */}
      <button
        className="icon-btn"
        onClick={() => handleMonitorEdit(monitor._id)}
      >
        <RiSettings3Line className="text-[19px]" />
      </button>

      {/* Delete Monitor Modal */}
      <DeleteMonitorModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={() => handleMonitorDelete(monitor._id)}
      />
    </div>
  );
};

export default React.memo(MonitorItemActions);
