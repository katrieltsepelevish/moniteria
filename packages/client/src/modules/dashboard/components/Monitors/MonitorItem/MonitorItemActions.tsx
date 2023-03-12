import React from 'react';

import {
  RiPauseLine,
  RiPlayLine,
  RiCloseLine,
  RiSettings3Line,
  RiLink,
} from 'react-icons/ri';

import {
  MonitorState,
  useDeleteMonitorMutation,
  useUpdateMonitorMutation,
} from '../../../../../services/monitor/monitorApi';
import DeleteMonitorModal from '../../Modal/DeleteMonitorModal';
import EditMonitorModal from '../../Modal/EditMonitorModal';

interface MonitorItemActionsProps {
  monitor: MonitorState;
}

const MonitorItemActions: React.FC<MonitorItemActionsProps> = ({ monitor }) => {
  const [updateMonitor] = useUpdateMonitorMutation();
  const [deleteMonitor] = useDeleteMonitorMutation();

  const [shoeEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);

  const handleMonitorActivation = async () => {
    await updateMonitor({
      _id: monitor._id,
      active: !monitor.active,
    });
  };

  const handleMonitorDelete = async (id: string) => {
    await deleteMonitor(id);

    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-row gap-0 bg-[white] rounded-[4px] items-center justify-between p-1">
      {/* Monitor link button */}
      <a target="_blank" href={monitor?.uri} className="icon-btn">
        <RiLink className="text-[21px]" />
      </a>

      {/* Delete button */}
      <button
        className="icon-btn outline-none"
        onClick={() => setShowDeleteModal(true)}
      >
        <RiCloseLine className="text-[19px]" />
      </button>

      {/* Pause / Resume buttons  */}
      {monitor?.active ? (
        <button
          className="icon-btn outline-none"
          onClick={handleMonitorActivation}
        >
          <RiPauseLine className="text-[19px]" />
        </button>
      ) : (
        <button
          className="icon-btn outline-none"
          onClick={handleMonitorActivation}
        >
          <RiPlayLine className="text-[19px]" />
        </button>
      )}

      {/* Edit button  */}
      <button
        className="icon-btn outline-none"
        onClick={() => setShowEditModal(true)}
      >
        <RiSettings3Line className="text-[19px]" />
      </button>

      <EditMonitorModal
        open={shoeEditModal}
        onClose={() => setShowEditModal(false)}
        selectedMonitor={monitor._id}
      />

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
