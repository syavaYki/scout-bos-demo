import { gql } from '@apollo/client';
import client from '../lib/apollos';
import { USER_INFO_QUERY_BODY } from './API_CONSTANTS';

export const GET_USER = gql`
  query getUser {
    viewer ${USER_INFO_QUERY_BODY}
  }
`;
export const getAuthDataClient = () => {
  return client.query({ query: GET_USER, fetchPolicy: 'network-only' });
};
