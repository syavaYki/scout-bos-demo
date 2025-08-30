import { gql, useQuery } from '@apollo/client';

const GET_LAST_EVENTS = gql`
  query CalendarLastEvents {
    events(first: 100) {
      nodes {
        content(format: RENDERED)
        databaseId
        startDate
        title
      }
    }
  }
`;

export function getEventsAPI() {
  return useQuery(GET_LAST_EVENTS, {
    onError: error => {
      console.error('Mutation error:', error);
    },
  });
}
