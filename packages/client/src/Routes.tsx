import React from 'react';
import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';

import { useCheckSetupQuery } from './services/setup/setupApi';
import Setup from './modules/setup/pages/Setup';
import Login from './shared/authentication/pages/Login';
import Loader from './components/Loader';
import { useGetMeQuery } from './services/auth/authApi';
import Register from './shared/authentication/pages/Register';
import Dashboard from './modules/dashboard/pages/Dashboard';

const UNAUTHORIZED_CODE = 401;

const Routes = () => {
  const {
    data: setupConfig,
    error: checkSetupError,
    isFetching: isFetchingSetup,
    refetch: refetchCheckSetup,
  } = useCheckSetupQuery(null);
  const { error: userError, isFetching: isFetchingMe } =
    useGetMeQuery<any>(null);

  const refetchTimer = React.useRef<any>();

  React.useEffect(() => {
    if (Boolean(checkSetupError)) {
      refetchTimer.current = setTimeout(() => {
        refetchCheckSetup();
      }, 5 * 1000); // 5 seconds
    }

    return () => clearTimeout(refetchTimer.current);
  }, [checkSetupError]);

  const authorized = React.useMemo(
    () => userError?.status !== UNAUTHORIZED_CODE,
    [userError]
  );

  const setupCompleted = React.useMemo(
    () => setupConfig?.completed,
    [setupConfig]
  );

  if (isFetchingMe || isFetchingSetup || Boolean(checkSetupError)) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Switch>
        {!setupCompleted && (
          <>
            <Route path="/setup" element={<Setup />} />
            <Route path="*" element={<Navigate to="/setup" />} />
          </>
        )}
        {setupCompleted && !authorized && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        {setupCompleted && authorized && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<>Not Found</>} /> */}
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default React.memo(Routes);
