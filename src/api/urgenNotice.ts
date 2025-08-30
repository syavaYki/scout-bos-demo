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

export const urgenNoticeApi = () => {
  return useQuery(GET_MESSAGE_DATA, {
    onError: error => {
      console.error('Error:', error);
    },
  });
};
