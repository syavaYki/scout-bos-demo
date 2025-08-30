export type ImageBlock = {
  attributes: {
    url: string;
    id: number;
    alt?: string;
  };
  __typename: 'CoreImage';
};

export type postDetailsBlock = {
  attributes: {
    url: string;
    id: number;
    alt: string;
  };
  __typename: 'CoreDetails';
};
