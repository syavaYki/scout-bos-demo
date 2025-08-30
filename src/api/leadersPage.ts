import { gql, useQuery } from '@apollo/client';

const GET_LEADERS = gql`
  query GetLeadersQuery {
    leaders {
      nodes {
        title
        leaderFields {
          email
          fullName
          position
          sortOrderValue
          ulad
          selfie {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export const UseGetLeadersApi = () => {
  return useQuery(GET_LEADERS, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Get Leader error:', error);
    },
  });
};
