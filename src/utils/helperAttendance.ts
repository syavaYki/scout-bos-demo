import {
  AttandancSheetsData,
  AttandanceUserTableData,
  AttendanceResponse,
} from '../types/Attandance';

export function attendanceParser(
  data: AttendanceResponse,
): AttandancSheetsData[] {
  const dataArr: AttandancSheetsData[] = [];

  if (data?.attendances?.nodes) {
    const dateRegex = /^\d{1,4}[-/.,]\d{1,4}[-/.,]\d{1,4}$/;

    data.attendances.nodes.forEach(item => {
      let titleDateValue: Date | string = 'NO DATE';
      if (dateRegex.test(item.title)) {
        titleDateValue = new Date(item.title).toISOString().split('T')[0];
      }
      const itemData: AttandancSheetsData = {
        titleDate: titleDateValue,
        body: item.attendantsCardFields.data ?? '',
        id: item.databaseId,
      };
      dataArr.push(itemData);
    });
  }
  return dataArr;
}

export function parseTableItems(data: {
  attendance?: {
    title?: string;
    databaseId?: number;
    attendantsCardFields?: {
      data?: string;
    };
  };
  title?: string;
}): AttandanceUserTableData {
  const parsedData: AttandanceUserTableData = {
    title: data?.attendance?.title,
    id: data?.attendance?.databaseId ? data?.attendance?.databaseId : 0,
    body: [],
  };

  try {
    if (data?.attendance?.attendantsCardFields?.data) {
      const parsedBody = JSON.parse(data.attendance.attendantsCardFields.data);
      parsedData.body = parsedBody;
    }
  } catch (error) {
    console.error(error);
    return {
      title: parsedData.title,
      id: parsedData.id,
      body: [],
    };
  }
  return parsedData;
}
