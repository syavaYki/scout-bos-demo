import { useMutation, gql, useApolloClient } from '@apollo/client';

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

// export default function LogOut() {
//   return useMutation(LOG_OUT);
// }

// import { gql, useMutation, useApolloClient } from '@apollo/client';

// const LOGOUT = gql`
// 	mutation Logout {
// 		logout(input: {}) {
// 			status
// 		}
// 	}
// `;

export const LogOut = () => {
  const apolloClient = useApolloClient();
  const [mutation, mutationResults] = useMutation(LOG_OUT);

  const logoutMutation = async () => {
    // Remove all data from the store since we are now logged out.
    await apolloClient.clearStore();
    return mutation();
  };

  return { logoutMutation, results: mutationResults };
};
