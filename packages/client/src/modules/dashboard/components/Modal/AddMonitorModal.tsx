import React from 'react';

import { RiCloseLine, RiSendPlaneLine } from 'react-icons/ri';

import Field from '../../../../components/Field';
import IconButton from '../../../../components/IconButton';
import Modal from '../../../../components/Modal';
import SelectField from '../../../../components/SelectField';
import {
  AddMonitorRequest,
  useAddMonitorMutation,
} from '../../../../services/monitor/monitorApi';

const initalFormValues: AddMonitorRequest = {
  name: '',
  uri: '',
  type: 'http',
  heartbeatInterval: 60,
  retries: 0,
};

interface AddMonitorModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMonitorModal: React.FC<AddMonitorModalProps> = ({ open, onClose }) => {
  const [errors, setErrors] = React.useState<any>(null);

  const [addMonitor] = useAddMonitorMutation();

  const [formValues, setFormValues] =
    React.useState<AddMonitorRequest>(initalFormValues);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      await addMonitor({ ...formValues }).unwrap();

      setFormValues(initalFormValues);
      setErrors(null);

      onClose();
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err?.data?.errors);
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        header={
          <>
            <h3 className="font-semibold text-[18px]">Add Monitor</h3>
          </>
        }
        content={
          <>
            <div className="mt-2 text-[12px] text-[#989898]">
              <span>
                Fill out the form below to configure an additional monitoring
                service for a website
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Field
                label="Friendly Name"
                name="name"
                type="text"
                error={errors?.name}
                onChange={handleInputChange}
                value={formValues?.name}
              />
              <Field
                label="URI"
                name="uri"
                type="text"
                placeholder="https://google.com/"
                error={errors?.uri}
                onChange={handleInputChange}
                value={formValues?.uri}
              />
              <SelectField
                label="Type"
                options={[{ name: 'HTTP(s)', value: 'http' }]}
                onChange={handleInputChange}
                value={formValues?.type}
              />
              <Field
                label="Heartbeat Interval"
                name="heartbeatInterval"
                type="number"
                onChange={handleInputChange}
                value={formValues?.heartbeatInterval}
              />
              <Field
                label="Retries"
                name="retries"
                type="number"
                onChange={handleInputChange}
                value={formValues?.retries}
              />
            </div>
          </>
        }
        footer={
          <div className="flex flex-row gap-2 mt-2">
            <IconButton
              label="Clear"
              className="ring-1 ring-inset ring-gray-300"
              icon={<RiCloseLine className="text-[21px]" />}
              onClick={() => setFormValues(initalFormValues)}
            />
            <IconButton
              label="Submit"
              icon={<RiSendPlaneLine className="text-[21px]" />}
              darkMode
              onClick={handleSubmit}
            />
          </div>
        }
      />
    </>
  );
};

export default React.memo(AddMonitorModal);
