import { gql, useQuery } from '@apollo/client';

const GET_LATEST_NEWS = gql`
  query LatestActivityQuery {
    news(last: 3) {
      nodes {
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        title
        newsFields {
          body
        }
      }
    }
  }
`;

export function UseGetNewsAPI() {
  return useQuery(GET_LATEST_NEWS, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    },
  });
}
