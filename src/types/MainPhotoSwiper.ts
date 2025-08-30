import { ImageBlock } from './graphqlBlocks';

export type ImageAPIData = {
  url: string | '';
  id: number;
  alt?: string; // The "alt" property is optional
};

type PostNode = {
  editorBlocks: ImageBlock[];
};

type Posts = {
  nodes: PostNode[];
};

export type Data = {
  posts: Posts;
};
