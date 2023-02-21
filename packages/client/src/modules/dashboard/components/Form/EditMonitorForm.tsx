import React from 'react';

import { RiCloseLine, RiSaveLine } from 'react-icons/ri';
import Field from '../../../../components/Field';

import IconButton from '../../../../components/IconButton';
import SelectField from '../../../../components/SelectField';

const EditMonitorForm = () => (
  <div className="flex flex-col gap-2 mt-4">
    <Field label="Friendly Name" name="name" type="text" />
    <Field
      label="URL"
      name="url"
      type="text"
      placeholder="https://google.com/"
    />
    <SelectField label="Type" options={[{ name: 'HTTPS', value: 'https' }]} />
    <Field
      label="Heartbeat Interval"
      name="heartbeat_interval"
      type="number"
      value={60}
    />
    <Field label="Retries" name="retries" type="number" value={0} />
    <div className="flex flex-row gap-2 mt-2">
      <IconButton
        label="Save"
        icon={<RiSaveLine className="text-[21px]" />}
        darkMode
      />
      <IconButton
        label="Clear"
        icon={<RiCloseLine className="text-[21px]" />}
      />
    </div>
  </div>
);

export default React.memo(EditMonitorForm);
