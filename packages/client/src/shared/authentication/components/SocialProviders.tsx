import React from 'react';

import { SiGoogle } from 'react-icons/si';
import { TbBrandGithub } from 'react-icons/tb';

import Button from '../../../components/Button';

const SocialProviders = () => {
  return (
    <div className="flex gap-[8px] flex-col">
      <Button
        text="Continue with Google"
        icon={<SiGoogle className="text-[18px]" />}
      />
      <Button
        text="Continue with Github"
        icon={<TbBrandGithub className="text-[21px]" />}
      />
    </div>
  );
};

export default React.memo(SocialProviders);
