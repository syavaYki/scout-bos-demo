export type UrgentNoticeData = {
  title: string | '';
  shortDescription: string | '';
  body: string | '';
  date: Date | undefined;
};

export interface UrgentNoticeFields {
  __typename: 'UrgentNoticeFields';
  body: string;
  date: string;
  shortDescription: string;
  title: string;
}

interface UrgentNotice {
  __typename: 'UrgentNotice';
  urgentNoticeFields: UrgentNoticeFields;
}

interface RootQueryToUrgentNoticeConnection {
  __typename: 'RootQueryToUrgentNoticeConnection';
  nodes: UrgentNotice[];
}

export interface UrgentNotices {
  urgentNotices: RootQueryToUrgentNoticeConnection;
}
