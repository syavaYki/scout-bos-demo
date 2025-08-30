import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      user {
        databaseId
      }
    }
  }
`;

export default function resetPasswordAPI() {
  return useMutation(RESET_PASSWORD, {
    onError: e => {
      console.error(e);
    },
  });
}
