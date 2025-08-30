import {
  PaymentACF,
  PaymentEdge,
  PaymentTableData,
} from '../types/PaymentsTypes';
import { User } from '../types/User';
import { validateDate } from './dateHelper';
import { getUserByID } from './userManagmentHelper';

export function buildTableRow(
  payment: PaymentACF,
  user: User | undefined,
): PaymentTableData {
  const row: PaymentTableData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    userid: payment.userid,
    amount: payment.amount,
    date: validateDate(payment.date),
    type: payment.type,
    comments: payment.comments,
  };

  return row;
}

export function parseAllPaymentDataAPI(
  paymentData: PaymentEdge[] | undefined,
  users: User[],
): PaymentTableData[] {
  const parsedData: PaymentTableData[] = [];

  if (paymentData && users) {
    paymentData.forEach(item => {
      const dataNode = item.node?.payments;
      const userID = dataNode?.userid;
      const user = getUserByID(userID, users);
      if (dataNode && user) {
        parsedData.push(buildTableRow(dataNode, user));
      }
    });
  }
  return parsedData;
}
