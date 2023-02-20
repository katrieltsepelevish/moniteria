import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TextDivider from '../../../components/TextDivider';
import ManualLoginForm from '../components/ManualLoginForm';
import SocialProviders from '../components/SocialProviders';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    return navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-[28px] font-disket font-semibold">
            Welcome back!
          </h1>
          <span className="opacity-[0.5]">Log into your account</span>
        </div>
        <div className="mt-6">
          <ManualLoginForm onSubmit={handleSubmit} />
          {/* <TextDivider text="OR" />
          <SocialProviders /> */}
        </div>
      </div>
      <Link to="/register" className="mt-4">
        <small className="underline text-[#9e9e9e]">Move to registration</small>
      </Link>
    </div>
  );
};

export default React.memo(Login);
