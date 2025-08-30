import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { UsersPaymentTable } from '../../components/UsersPaymentTable';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';

export const MyPayments = () => {
  const { user, error } = useAppSelector(state => state.auth);

  return (
    <>
      {!!error && <ErrorLoadAPINotice />}
      <UsersPaymentTable user={user} />
    </>
  );
};
