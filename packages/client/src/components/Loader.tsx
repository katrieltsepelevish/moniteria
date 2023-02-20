import React from 'react';

const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
    </div>
  </div>
);

export default React.memo(Loader);
