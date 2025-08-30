import { ApolloError } from '@apollo/client';

export interface PaymentTableData extends Omit<PaymentACF, 'date' | 'userId'> {
  firstName: string;
  lastName: string;
  username: string;
  date: string;
}

export interface PaymentACF {
  date: string;
  amount: number;
  type: string;
  userid: number;
  comments: string;
}

interface PaymentNode {
  id: string;
  databaseId: number;
  title: string;
  payments: PaymentACF;
}

export interface PaymentEdge {
  cursor: string;
  node: PaymentNode;
}

export interface PaymentsResponse {
  payments: {
    edges: PaymentEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    [key: string]: unknown; // Allow other properties
  };
}

export interface PaymentsAPIResult {
  loading: boolean;
  error: ApolloError | undefined;
  payments: PaymentEdge[] | undefined;
}
