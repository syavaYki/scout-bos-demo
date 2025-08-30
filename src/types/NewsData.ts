export type NewsData = {
  title: string | undefined | null;
  body: string | undefined | null;
  imgUrl: string | undefined;
  date: Date | undefined | null;
};

interface FeaturedImage {
  node: {
    sourceUrl: string;
  };
}

interface NewsFields {
  body: string;
  [key: string]: unknown; // Allow other fields
}

interface NewsItem {
  date: string;
  featuredImage: FeaturedImage | null; // Allow null if no featured image
  title: string;
  newsFields: NewsFields;
  [key: string]: unknown; // Allow other fields
}

interface NewsConnection {
  nodes: NewsItem[]; // Array of news items
  [key: string]: unknown; // Allow other connection properties
}

export interface NewsAPIData {
  news: NewsConnection;
  [key: string]: unknown; // Allow other top-level data
}
