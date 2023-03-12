import { useHotkeys } from '@mantine/hooks';
import React from 'react';

import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  header: React.ReactNode;
  content?: React.ReactNode;
  footer: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  header,
  content,
  footer,
}) => {
  useHotkeys([
    [
      'Escape',
      () => {
        if (open) {
          onClose();
        }
      },
    ],
  ]);

  if (!open) return <></>;

  return (
    <div
      className="relative z-[100]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="block w-full text-left">
                  <div className="flex flex-items justify-between items-start">
                    {header}
                    <button
                      className="p-1 rounded-[4px] hover:bg-[#f2f2f2] hover:text-black transition-all duration-500"
                      onClick={onClose}
                    >
                      <RiCloseLine className="text-[19px]" />
                    </button>
                  </div>
                  <div className="block mt-2">{content}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
