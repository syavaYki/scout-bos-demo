import { ImageBlock } from '../types/graphqlBlocks';
import { Data } from '../types/MainPhotoSwiper';
import { ImageAPIData } from '../types/MainPhotoSwiper';

export function parseMainPhotoSwiperData(data: Data): ImageAPIData[] {
  if (data?.posts?.nodes[0]?.editorBlocks) {
    const blocks: ImageAPIData[] = data.posts.nodes[0]?.editorBlocks
      .filter((block: ImageBlock) => block.__typename === 'CoreImage')
      .map((block: ImageBlock) => block.attributes);

    return blocks || [];
  }

  return [];
}
