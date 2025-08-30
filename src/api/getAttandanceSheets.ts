import { gql, useMutation, useQuery } from '@apollo/client';

const GET_ATTENDNCE_SHEETS = gql`
  query getAttendance {
    attendances(last: 500) {
      nodes {
        id
        title
        databaseId
        attendantsCardFields {
          data
        }
      }
    }
  }
`;

const CREATE_ATTENDANCE_MUTATION = gql`
  mutation CreateNewAttendance($title: String, $data: String) {
    createAttendanceWithAcf(input: { data: $data, title: $title }) {
      success
    }
  }
`;

const UPDATE_ATTENDANCE_MUTATION = gql`
  mutation updateAttandance($id: ID!, $title: String, $data: String) {
    updateAttendanceAcfData(input: { id: $id, data: $data, title: $title }) {
      clientMutationId
      success
    }
  }
`;

const GET_SHEET_BY_ID = gql`
  query getById($id: ID!) {
    attendance(id: $id, idType: DATABASE_ID) {
      databaseId
      attendantsCardFields {
        data
      }
      title
    }
  }
`;

const DELETE_SHEET_BY_ID = gql`
  mutation deleteAttendance($id: ID!) {
    deleteAttendance(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const UseGetAttendanceSheetsAPI = () => {
  return useQuery(GET_ATTENDNCE_SHEETS, {
    fetchPolicy: 'network-only',
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Get All Attandance error:', error);
    },
  });
};

export const UseGetAttendanceSheetsByIDAPI = (id: number) => {
  return useQuery(GET_SHEET_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Get By ID Attandance error:', error);
    },
  });
};

export function UseUpdateAttandanceSheetAPI() {
  return useMutation(UPDATE_ATTENDANCE_MUTATION, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Update Attandance mutation error:', error);
    },
  });
}

export function UseCreateAttandanceSheetAPI() {
  return useMutation(CREATE_ATTENDANCE_MUTATION, {
    onError: error => {
      // eslint-disable-next-line no-console
      console.error('Create Attandance mutation error:', error);
    },
  });
}

export function UseDeleteAttandanceSheetAPI() {
  return useMutation(DELETE_SHEET_BY_ID);
}
