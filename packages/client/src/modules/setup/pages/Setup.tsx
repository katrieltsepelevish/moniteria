import React from 'react';

import { useConfigureSetupMutation } from '../../../services/setup/setupApi';
import ManualRegistrationForm from '../../../shared/authentication/components/ManualRegistrationForm';

const Setup = () => {
  const [configureSetup] = useConfigureSetupMutation();

  const handleSubmit = async () => {
    await configureSetup({
      completed: true,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-[28px] font-disket font-semibold">Setup!</h1>
          <span className="opacity-[0.5]">Sign up your admin account</span>
        </div>
        <div className="mt-6">
          <ManualRegistrationForm onSubmit={handleSubmit} />
          {/* <TextDivider text="OR" />
          <SocialProviders /> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Setup);
