import { gql, useMutation } from '@apollo/client';

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;

export default function LogInAPI() {
  return useMutation(LOG_IN, {
    onError: () => {
      // console.error('Login mutation rror:', error);
    },
  });
}
