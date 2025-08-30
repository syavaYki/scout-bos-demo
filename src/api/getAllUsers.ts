import { gql, useQuery } from '@apollo/client';
import { USER_INFO_QUERY_BODY } from './API_CONSTANTS';

const GET_USERS = gql`
  query GetAllUsers {
    users(first: 999) {
      nodes ${USER_INFO_QUERY_BODY}
    }
  }
`;

export const UseGetAllUsersApi = () => {
  return useQuery(GET_USERS, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Get All Users error:', error);
    },
  });
};
