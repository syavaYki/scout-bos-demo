import { ImageBlock } from './graphqlBlocks';

export type ImageAPIData = { id: number; url: string | '' };

export type LatestActivitiesPostData = {
  title: string;
  description: string;
  date: Date | undefined;
  imageData: ImageAPIData[] | [];
};

interface LatestActivityFields {
  title: string;
  shortDescrition: string;
  activityDate: string;
}

interface LatestActivityNode {
  latestActivityFields: LatestActivityFields;
  editorBlocks: ImageBlock[];
}

interface LatestActivities {
  nodes: LatestActivityNode[];
}

export interface LatestActivitiesData {
  latestActivities: LatestActivities;
}
