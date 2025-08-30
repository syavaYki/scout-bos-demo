import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import * as authActions from '../../features/authentication';
import { LogOut } from '../../api/logOut';

export default function LogOutPage() {
  const { logoutMutation } = LogOut();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    logoutMutation();
    dispatch(authActions.actions.unAuth());
  }, [dispatch, logoutMutation]);

  navigate('/');

  return <></>;
}
