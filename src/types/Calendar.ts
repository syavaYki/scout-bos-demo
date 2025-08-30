export type EventData = {
  id: number;
  dateTime: Date;
  title: string;
  body: string;
};

type Event = {
  __typename: 'Event';
  databaseId: number;
  content: string;
  startDate: string;
  title: string;
};

type RootQueryToEventConnection = {
  __typename: 'RootQueryToEventConnection';
  nodes: Event[];
};

export type Events = {
  events: RootQueryToEventConnection;
};
