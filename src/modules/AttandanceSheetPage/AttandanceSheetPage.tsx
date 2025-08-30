import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  UseCreateAttandanceSheetAPI,
  UseGetAttendanceSheetsByIDAPI,
  UseUpdateAttandanceSheetAPI,
} from '../../api/getAttandanceSheets';
import {
  AttandancSheetsData,
  AttendanceTableData,
  TableModes,
} from '../../types/Attandance';
import { parseTableItems } from '../../utils/helperAttendance';
import { ModalError } from '../../components/ModalError';
import { AttandanceTable } from '../../components/AttandanceTable';
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  CheckboxEditorModule,
} from 'ag-grid-community';
import { ModalSuccess } from '../../components/ModalSuccess';
import { UseGetAllUsersApi } from '../../api/getAllUsers';
import { parseUsersAPI } from '../../utils/userManagmentHelper';
import { ModalChoice } from '../../components/ModalChoice';
import { AuthLevels } from '../../types/AuthLevels';
import { useAppSelector } from '../../app/hooks';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  CheckboxEditorModule,
]);

const getIdFromURL = (location: ReturnType<typeof useLocation>) => {
  return location.pathname.split('/').slice(-1)[0];
};

export const AttandanceSheetPage = () => {
  const { accessLevel } = useAppSelector(state => state.auth);
  const authLevelAllow =
    accessLevel === AuthLevels.ADMIN ||
    accessLevel === AuthLevels.AUTOR ||
    accessLevel === AuthLevels.VYHOVNYK ||
    accessLevel === AuthLevels.PLASTUN_SENIOR;

  const location = useLocation();
  const [tableData, setTableData] = useState<
    AttendanceTableData[] | undefined
  >();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [tableActionData, setTableActionData] = useState<
    AttandancSheetsData | undefined
  >();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');
  const sheetId = getIdFromURL(location);

  const [date, setDate] = useState<string | undefined>('');

  const { data: usersData } = UseGetAllUsersApi();

  const { data: sheetData, error: getError } = UseGetAttendanceSheetsByIDAPI(
    Number(sheetId),
  );
  const [createSheet, { error: createError }] = UseCreateAttandanceSheetAPI();
  const [updateSheet, { error: errorUpdateSheet }] =
    UseUpdateAttandanceSheetAPI();

  useEffect(() => {
    if (sheetData && mode !== TableModes.CREATE) {
      const tableDataParsed = parseTableItems(sheetData);

      if (tableDataParsed) {
        setDate(() => tableDataParsed?.title);

        if (tableDataParsed?.body) {
          setTableData(tableDataParsed.body);
        }
      }
    }
  }, [sheetData, mode]);

  useEffect(() => {
    if (usersData && mode === TableModes.CREATE) {
      const userDataParsed = parseUsersAPI(usersData)
        .filter(user => user.roles?.includes('plastun'))
        .map(user => {
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            present: true,
            ulad: user.ulad || '',
          };
        });

      setTableData(userDataParsed);
      setDate(new Date().toDateString());
    }
  }, [sheetData, mode, usersData]);

  useEffect(() => {
    if (getError) {
      setError(getError.message);
    } else if (errorUpdateSheet) {
      setError(errorUpdateSheet.message);
    } else if (createError) {
      setError(createError.message);
    }
  }, [errorUpdateSheet, getError, createError]);

  function handleTableAction(data: AttandancSheetsData) {
    setTableActionData(data);
    setChoiceVisible(true);
  }

  function handleSuccess() {
    switch (mode) {
      case TableModes.CREATE:
        setSuccessMessage('Ви успішно записали відвідування пластуні !!!');
        break;

      case TableModes.EDIT:
        setSuccessMessage(
          'Ви успішно обновили запис відвідування пластуні !!!',
        );
        break;

      default:
        break;
    }
  }

  async function handleUpdateAttandance(data: AttandancSheetsData) {
    await updateSheet({
      variables: {
        id: data.id,
        title: data.titleDate,
        data: data.body,
      },
    });

    if (!error) {
      handleSuccess();
    }
  }

  async function handleCreateAttandance(data: AttandancSheetsData) {
    await createSheet({
      variables: {
        title: data.titleDate,
        data: data.body,
      },
    });

    if (!error) {
      handleSuccess();
    }
  }

  function handleChoice(result: boolean) {
    if (result && tableActionData) {
      switch (mode) {
        case TableModes.CREATE:
          handleCreateAttandance(tableActionData);
          break;

        case TableModes.EDIT:
          handleUpdateAttandance(tableActionData);
          break;

        default:
          break;
      }
    }

    setTableActionData(() => undefined);
    setChoiceVisible(false);
  }

  if (
    !authLevelAllow &&
    (mode === TableModes.CREATE || mode === TableModes.EDIT)
  ) {
    return <ErrorLoadAPINotice />;
  }

  return (
    <>
      <ModalError
        title="Помилка"
        body={`Виникла помилка зв'яжіться з адміністратором. \n ${error}`}
        isActive={!!error}
      />

      <ModalSuccess
        title="Вітаю все вийшло!"
        body={successMessage}
        isActive={!!successMessage && !error}
        onClose={() => {
          navigate(-1);
        }}
      />

      <ModalChoice
        title="Are you sure"
        body="Are tottaly sure?"
        isActive={choiceVisible}
        onAction={handleChoice}
      />

      <AttandanceTable
        id={Number(sheetId)}
        sheetDate={date || ''}
        data={tableData}
        mode={mode as TableModes}
        onAction={handleTableAction}
      />
    </>
  );
};
