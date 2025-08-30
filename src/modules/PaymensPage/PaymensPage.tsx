import React from 'react';
import { getPayments } from '../../api/payments';
import { PaymentTable } from '../../components/PaymentTable';
import { parseAllPaymentDataAPI } from '../../utils/helperPayments';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';
import { Container, Heading } from 'react-bulma-components';
import { getAllUsersApi } from '../../api/getAllUsers';
import { parseUsersAPI } from '../../utils/userManagmentHelper';
import { ModalLoader } from '../../components/ModalLoader';

const PaymentsPage: React.FC = () => {
  const { error, loading, payments } = getPayments();
  const {
    data: UserData,
    loading: userLoading,
    error: UserErro,
  } = getAllUsersApi();

  return (
    <>
      <ModalLoader isActive={loading || userLoading} />

      <Container className="p-5">
        {(!!error || !!UserErro) && <ErrorLoadAPINotice />}

        <Heading className="pb-3">All Payments</Heading>

        <PaymentTable
          data={parseAllPaymentDataAPI(payments, parseUsersAPI(UserData))}
        />
      </Container>
    </>
  );
};

export default PaymentsPage;
