import { gql, useQuery } from '@apollo/client';

const GET_IMG_DATA = gql`
  query ImageQueryMainSlider($title: String) {
    posts(first: 1, where: { title: $title }) {
      nodes {
        editorBlocks {
          ... on CoreImage {
            attributes {
              url
              id
              alt
            }
          }
        }
      }
    }
  }
`;

export function getMainSwiperPhotoBlocks() {
  return useQuery(GET_IMG_DATA, {
    variables: { title: 'Main Photo Slider' },
    onError: error => {
      console.error('Error:', error);
    },
  });
}
