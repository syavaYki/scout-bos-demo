import { gql, useQuery } from '@apollo/client';

const GET_MESSAGE_DATA = gql`
  {
    urgentNotices(first: 1) {
      nodes {
        urgentNoticeFields {
          body
          date
          shortDescription
          title
        }
      }
    }
  }
`;

export const useUrgenNoticeApi = () => {
  return useQuery(GET_MESSAGE_DATA, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    },
  });
};
