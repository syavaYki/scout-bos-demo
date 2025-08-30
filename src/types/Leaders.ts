export type LeaderData = {
  fullname: string | null | undefined;
  email: string | null | undefined;
  position: string | null | undefined;
  sortOrderValue: number;
  ulad: string;
  imgUrl: string | undefined;
};

export enum ValidUlad {
  STARSHYNA = 'Станична Старшина',
}

interface MediaItem {
  mediaItemUrl: string;
  [key: string]: unknown; // Allow other properties
}

interface ConnectionEdge<T> {
  node: T;
  [key: string]: unknown; // Allow other properties
}

interface LeaderFields {
  email: string | null; // Allow null values
  fullName: string;
  position: string;
  sortOrderValue: string;
  ulad: string;
  selfie: ConnectionEdge<MediaItem> | null; // Allow null values
  [key: string]: unknown; // Allow other properties
}

interface Leader {
  title: string;
  leaderFields: LeaderFields;
  [key: string]: unknown; // Allow other properties
}

interface Nodes {
  nodes: Leader[]; // Array of nodes
  [key: string]: unknown; // Allow other properties
}

export interface LeaderAPIData {
  leaders: Nodes;
  [key: string]: unknown; // Allow unknown connection type or other data
}
