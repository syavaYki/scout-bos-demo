import { ImageBlock } from '../types/graphqlBlocks';
import {
  ImageAPIData,
  LatestActivitiesData,
  LatestActivitiesPostData,
} from '../types/LatestActivity';

export function parseLatestActivitiesPostData(
  data: LatestActivitiesData | undefined,
): LatestActivitiesPostData | undefined {
  if (data !== undefined) {
    const parsedData: LatestActivitiesPostData = {
      title: '',
      description: '',
      date: undefined,
      imageData: [],
    };

    const fields = data?.latestActivities?.nodes[0]?.latestActivityFields;

    parsedData.title = fields?.title || '';
    parsedData.description = fields?.shortDescrition || '';
    parsedData.date = new Date(fields?.activityDate) || null;

    const imgBlocks: ImageAPIData[] =
      data?.latestActivities?.nodes[0]?.editorBlocks
        .filter((block: ImageBlock) => block.__typename === 'CoreImage')
        .map((block: ImageBlock) => {
          return {
            id: block.attributes.id,
            url: block.attributes.url,
          };
        });

    parsedData.imageData = imgBlocks || [];

    return parsedData;
  }

  return undefined;
}
