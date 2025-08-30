import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../features/authentication';

type Props = {
  redirectPath?: string;
};

export const ProtectedRoute: React.FC<Props> = ({ redirectPath = 'login' }) => {
  const { loggedIn, user, loading, error } = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn === undefined || !user) {
      dispatch(authActions.init());
    }
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Виникла Помилка, спробуйте знову</h1>;
  }

  if (!loggedIn) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return <Outlet />;
};
