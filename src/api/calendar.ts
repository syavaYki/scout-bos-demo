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

export function UseGetEventsAPI() {
  return useQuery(GET_LAST_EVENTS, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Mutation error:', error);
    },
  });
}
