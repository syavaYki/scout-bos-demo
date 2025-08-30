import { NewsAPIData, NewsData } from '../types/NewsData';

export function parseNewsApi(data: NewsAPIData): NewsData[] | [] {
  const parsedData: NewsData[] = [];

  if (data) {
    const nodes = data?.news?.nodes;

    if (nodes && nodes.length > 0) {
      nodes.map(node => {
        parsedData.push({
          title: node.title,
          body: node?.newsFields?.body,
          imgUrl: node?.featuredImage?.node?.sourceUrl,
          date: new Date(node.date),
        });
      });
    }
  }

  return parsedData;
}
