import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TextDivider from '../../../components/TextDivider';
import ManualRegistrationForm from '../components/ManualRegistrationForm';
import SocialProviders from '../components/SocialProviders';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    return navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-[28px] font-disket font-semibold">Welcome!</h1>
          <span className="opacity-[0.5]">Register a new account</span>
        </div>
        <div className="mt-6">
          <ManualRegistrationForm onSubmit={handleSubmit} />
          {/* <TextDivider text="OR" />
          <SocialProviders /> */}
        </div>
      </div>
      <Link to="/login" className="mt-4">
        <small className="underline text-[#9e9e9e]">Move to Login</small>
      </Link>
    </div>
  );
};

export default React.memo(Register);
