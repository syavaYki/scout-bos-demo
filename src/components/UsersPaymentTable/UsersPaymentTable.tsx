import React from 'react';
import { PaymentTable } from '../PaymentTable';
import { User } from '../../types/User';
import { getPayments } from '../../api/payments';
import { buildTableRow } from '../../utils/helperPayments';
import { ErrorLoadAPINotice } from '../ErrorLoadAPINotice';

type Props = {
  user: User | undefined;
  compactView?: boolean;
};
export const UsersPaymentTable: React.FC<Props> = ({
  user,
  compactView = true,
}) => {
  const { error, payments } = getPayments(user ? String(user.id) : undefined);
  return (
    <>
      {!!error && <ErrorLoadAPINotice />}

      <PaymentTable
        data={payments?.map(payment =>
          buildTableRow(payment.node.payments, user),
        )}
        compact={compactView}
      />
    </>
  );
};
