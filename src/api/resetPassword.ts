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

export default function USeResetPasswordAPI() {
  return useMutation(RESET_PASSWORD, {
    onError: e => {
      // eslint-disable-next-line no-console
      console.error(e);
    },
  });
}
