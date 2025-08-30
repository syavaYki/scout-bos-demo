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

export const getLeadersApi = () => {
  return useQuery(GET_LEADERS, {
    onError: error => {
      console.error('Get Leader error:', error);
    },
  });
};
