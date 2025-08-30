import { UrgentNoticeData, UrgentNotices } from '../types/UrgenNotice';

export function parseApi(data: UrgentNotices): UrgentNoticeData | undefined {
  let parsedData = undefined;

  if (data) {
    if (data.urgentNotices.nodes.length > 0) {
      const rawData = data.urgentNotices.nodes[0].urgentNoticeFields;

      parsedData = {
        title: rawData.title || '',
        shortDescription: rawData.shortDescription || '',
        body: rawData.body || '',
        date: new Date(rawData.date) || undefined,
      };
    }
  }

  return parsedData;
}
