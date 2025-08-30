import { gql, useMutation } from '@apollo/client';

const SET_PASSWORD = gql`
  mutation setNewPassword($key: String!, $login: String!, $password: String!) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export default function UseSetNewPasswordAPI() {
  return useMutation(SET_PASSWORD, {
    onError: e => {
      // eslint-disable-next-line no-console
      console.error(e);
    },
  });
}
