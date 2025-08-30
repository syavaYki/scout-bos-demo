import { useState, useEffect } from 'react';
import {
  gql,
  useQuery,
  ApolloQueryResult,
  ApolloError,
  useMutation,
} from '@apollo/client';
import {
  PaymentEdge,
  PaymentsAPIResult,
  PaymentsResponse,
} from '../types/PaymentsTypes';

// GraphQL Query to get ALL payments (for all users) WITH pagination (same query as before)
const GET_ALL_PAYMENTS_QUERY = gql`
  query GetAllPayments($first: Int, $after: String) {
    payments(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          databaseId
          title
          payments {
            amount
            comments
            date
            type
            userid
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_ALL_PAYMENTS_QUERY_WITH_ID = gql`
  query GetAllPayments($first: Int, $after: String, $userId: String) {
    payments(first: $first, after: $after, where: { title: $userId }) {
      edges {
        cursor
        node {
          id
          databaseId
          title
          payments {
            amount
            comments
            date
            type
            userid
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createACF(
    $paymentAmount: Float
    $paymentComment: String
    $paymentDate: String
    $paymentType: String
    $paymentUserId: Int!
  ) {
    createPaymentWithACF(
      input: {
        paymentAmount: $paymentAmount
        paymentComment: $paymentComment
        paymentDate: $paymentDate
        paymentType: $paymentType
        paymentUserId: $paymentUserId
      }
    ) {
      success
      failedFields
      createdPayment {
        title
      }
    }
  }
`;

export function getPayments(
  filterUserId: string | undefined = undefined,
): PaymentsAPIResult {
  const paymentsPerPage = 500; // Fetch a larger number per page for background loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | undefined>(undefined);
  const [allPayments, setAllPayments] = useState<PaymentEdge[]>([]);

  let initialQuery;

  if (filterUserId) {
    initialQuery = useQuery<PaymentsResponse>(GET_ALL_PAYMENTS_QUERY_WITH_ID, {
      // useQuery for initial load
      variables: {
        first: paymentsPerPage,
        after: null,
        userId: filterUserId,
      },
      fetchPolicy: 'network-only',
    });
  } else {
    initialQuery = useQuery<PaymentsResponse>(GET_ALL_PAYMENTS_QUERY, {
      // useQuery for initial load
      variables: {
        first: paymentsPerPage,
        after: null,
      },
      fetchPolicy: 'network-only',
    });
  }

  useEffect(() => {
    const fetchAllPages = async () => {
      setLoading(true);
      setError(undefined);
      setAllPayments([]); // Clear previous payments

      let currentPayments: PaymentEdge[] = [];
      let cursor: string | null = null;
      let hasNext = true;

      try {
        // Initialize with the initial query result
        const result: ApolloQueryResult<PaymentsResponse> | undefined =
          await initialQuery.refetch(); // Use refetch to get initial data again, or could use initialQuery.data if available

        if (result?.data?.payments) {
          currentPayments = [...currentPayments, ...result.data.payments.edges];
          hasNext = result.data.payments.pageInfo.hasNextPage;
          cursor = result.data.payments.pageInfo.endCursor;
        } else {
          hasNext = false; // No initial data, stop
          setLoading(false);
          return;
        }

        // Fetch subsequent pages using fetchMore in a loop
        while (hasNext && cursor) {
          const fetchMoreResult = await initialQuery.fetchMore({
            // Use fetchMore from initialQuery
            variables: {
              after: cursor,
            },

            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult;
              return Object.assign({}, prevResult, {
                payments: {
                  __typename: prevResult.payments.__typename,
                  edges: [
                    ...prevResult.payments.edges,
                    ...fetchMoreResult.payments.edges,
                  ],
                  pageInfo: fetchMoreResult.payments.pageInfo,
                },
              });
            },
          });

          if (fetchMoreResult?.data?.payments) {
            currentPayments = [
              ...currentPayments,
              ...fetchMoreResult.data.payments.edges,
            ];
            hasNext = fetchMoreResult.data.payments.pageInfo.hasNextPage;
            cursor = fetchMoreResult.data.payments.pageInfo.endCursor;
          } else {
            hasNext = false; // Stop if fetchMore fails or no more data
            break;
          }
        }

        setAllPayments(currentPayments);
      } catch (fetchAllError: unknown) {
        setError(fetchAllError as ApolloError);
        console.error('Error fetching all payments:', fetchAllError);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPages();
  }, [initialQuery.fetchMore, initialQuery.data]); // Dependencies: fetchMore and initial data (for potential refetch on data change - though less relevant here)
  return {
    loading,
    error,
    payments: allPayments,
  };
}

export function createNewPaymentAPI() {
  return useMutation(CREATE_PAYMENT_MUTATION, {
    onError: error => {
      // Use the provided 'error' parameter
      console.error('Create Payment Log mutation error:', error);
    },
  });
}
