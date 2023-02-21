import React from 'react';

import { RiCloseLine, RiSendPlaneLine } from 'react-icons/ri';

import Field from '../../../../../components/Field';
import IconButton from '../../../../../components/IconButton';
import SelectField from '../../../../../components/SelectField';
import {
  AddMonitorRequest,
  useAddMonitorMutation,
} from '../../../../../services/monitor/monitorApi';

const initalFormValues: AddMonitorRequest = {
  name: '',
  uri: '',
  type: 'https',
  heartbeatInterval: 60,
  retries: 0,
};

const AddMonitorForm = () => {
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
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err?.data?.errors);
      }
    }
  };

  return (
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
        options={[{ name: 'HTTPS', value: 'https' }]}
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
      <div className="flex flex-row gap-2 mt-2">
        <IconButton
          label="Submit"
          icon={<RiSendPlaneLine className="text-[21px]" />}
          darkMode
          onClick={handleSubmit}
        />
        <IconButton
          label="Clear"
          icon={<RiCloseLine className="text-[21px]" />}
        />
      </div>
    </div>
  );
};

export default React.memo(AddMonitorForm);
