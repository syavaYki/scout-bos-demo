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

export default function setNewPasswordAPI() {
  return useMutation(SET_PASSWORD, {
    onError: e => {
      console.error(e);
    },
  });
}
