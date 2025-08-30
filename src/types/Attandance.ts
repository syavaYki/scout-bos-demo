export type AttandanceUserTableData = {
  id: number;
  title: string | undefined;
  body: AttendanceTableData[];
};

export type AttandancSheetsData = {
  id: number;
  titleDate: string;
  body: string;
};

export type AttendanceTableData = {
  id: number | undefined;
  name: string | undefined;
  ulad: string | undefined;
  present: boolean | undefined;
};

export interface AttendantsCardFields {
  __typename: 'AttendantsCardFields';
  data: string | null;
}

export interface Attendance {
  __typename: 'Attendance';
  id: string;
  title: string;
  databaseId: number;
  attendantsCardFields: AttendantsCardFields;
}

interface RootQueryToAttendanceConnection {
  __typename: 'RootQueryToAttendanceConnection';
  nodes: Attendance[];
}

export interface AttendanceResponse {
  attendances: RootQueryToAttendanceConnection;
}

export enum TableModes {
  VIEW = 'view',
  EDIT = 'edit',
  CREATE = 'create',
  DELETE = 'delete',
}
