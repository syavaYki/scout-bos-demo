import { gql, useQuery } from '@apollo/client';
import { LatestActivitiesData } from '../types/LatestActivity';

const GET_IMG_DATA = gql`
  query LatestActivityQuery {
    latestActivities(first: 1) {
      nodes {
        latestActivityFields {
          title
          shortDescrition
          activityDate
        }
        editorBlocks {
          ... on CoreImage {
            attributes {
              alt
              url
              id
            }
          }
        }
      }
    }
  }
`;

export function UseGetLatestActivitiesAPI() {
  return useQuery<LatestActivitiesData>(GET_IMG_DATA, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('error:', error);
    },
  });
}
