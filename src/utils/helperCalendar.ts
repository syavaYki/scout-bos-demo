import { EventData, Events } from '../types/Calendar';

function removeTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

export const parseCalendarEvents = (data: Events): EventData[] | [] => {
  if (data) {
    if (data?.events?.nodes) {
      return data?.events?.nodes
        .map(calEvent => {
          return {
            id: calEvent.databaseId,
            title: removeTags(calEvent.title),
            body: removeTags(calEvent.content),
            dateTime: new Date(calEvent.startDate),
          };
        })
        .sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
    }
    return [];
  }
  return [];
};
