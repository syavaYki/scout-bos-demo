import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  CellClassParams,
  ColDef,
  IRowNode,
  ISelectCellEditorParams,
  RowSelectionOptions,
  SelectionChangedEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  Theme,
  ClientSideRowModelModule,
  SelectEditorModule,
  CellClickedEvent,
} from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { User } from '../../types/User';
import { Block, Button } from 'react-bulma-components';
import style from './UserTable.module.scss';
import updateUserProfile from '../../api/updateUserProfile';
import {
  VALID_GRADES,
  VALID_STATES,
  VALID_STUPIN,
  VALID_ULAD,
} from '../constants/profileConstants';
import { ModalLoader } from '../ModalLoader';
import { InfoErrorModal } from './InfoErrorModal';
import { ModalChoice } from '../ModalChoice';
import { VALID_ACTION } from '../../types/databaseManagmant';
import { ModalBulkDataUpdate } from '../ModalBulkDataUpdate';
import { formatOutput } from '../../utils/userManagmentHelper';
import { useAppSelector } from '../../app/hooks';
import { AuthLevels } from '../../types/AuthLevels';
import { ModalSendEmailsDB } from '../ModalSendEmailsDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { ModalPaymentTable } from '../ModalPaymentTable';
import classNames from 'classnames';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  SelectEditorModule,
]);

enum NonHighlighColumNames {
  VIK = 'Вік',
}

function checkIfRowChanged(originalData: User[], rowData: User) {
  const origRow = originalData.find(rw => rw.id === rowData.id);
  if (origRow) {
    for (const key of Object.keys(rowData)) {
      if (key !== 'roles') {
        if (rowData[key as keyof User] !== origRow[key as keyof User]) {
          return true;
        }
      }
    }
  }
  return false;
}

type ChoiceAction = {
  title: string;
  body: string;
  fn: (() => void) | undefined;
};

interface Props {
  data: User[];
  onTableAction: (action: string) => void;
}

function paymentCellRender() {
  return (
    <FontAwesomeIcon
      icon={faMoneyBill1Wave}
      size="2x"
      // className="has-text-danger"
    />
  );
}

export const UserTable: React.FC<Props> = ({ data, onTableAction }) => {
  //#region States and Inits
  const { accessLevel } = useAppSelector(state => state.auth);
  const authLevelAllow =
    accessLevel === AuthLevels.ADMIN || accessLevel === AuthLevels.AUTOR;
  const [rowData, setRowData] = useState<User[]>(
    data.map(user => JSON.parse(JSON.stringify(user))),
  );
  const [selectedRowData, setSelectedRowData] = useState<IRowNode[]>([]);
  const [bulkAction, setBulkAction] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [info, setInfo] = useState<string[]>([]);
  const [updateProfile] = updateUserProfile();
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [choiceAction, setChoiceAction] = useState<ChoiceAction>({
    title: '',
    body: '',
    fn: undefined,
  });
  const [bulkEditVisible, setBulkEditVisible] = useState(false);
  const [bulkEmailSendVisible, setBulkEmailSendVisible] = useState(false);
  const [paymentsVisible, setPaymentVisibles] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  useEffect(
    () => setRowData(data.map(user => JSON.parse(JSON.stringify(user)))),
    [data],
  );
  //#endregion

  //#region table settings
  const [colDefs] = useState<ColDef<User>[]>([
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'username', headerName: 'User Name', editable: false },
    {
      field: 'plastId',
      headerName: 'Plast ID',
      cellDataType: 'number',
    },
    {
      field: 'firstName',
      headerName: "І'мя US",
    },
    { field: 'lastName', headerName: 'Прізвище US' },
    { field: 'childFirstNameUa', headerName: "І'мя UA" },
    { field: 'childLastNameUa', headerName: 'Прізвище UA' },
    { field: 'dob', headerName: 'Дата Народження', cellDataType: 'dateString' },
    {
      headerName: NonHighlighColumNames.VIK,
      editable: false,
      valueGetter: p => {
        if (p?.data?.dob) {
          const today = new Date();
          const birthDate = new Date(p.data?.dob);
          // Check if the birthday has occurred this year
          let years = today.getFullYear() - birthDate.getFullYear();
          if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() < birthDate.getDate())
          ) {
            years--;
          }

          return years;
        }
        // console.log(new Date() - new Date(p.data?.dob));
        return null;
      },
    },
    {
      field: 'stupin',
      headerName: 'Ступень',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: VALID_STUPIN,
      } as ISelectCellEditorParams,
    },
    {
      field: 'ulad',
      headerName: 'Улад',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: VALID_ULAD,
      } as ISelectCellEditorParams,
    },
    { field: 'email', headerName: 'Email', editable: false },
    { field: 'phoneNumber', headerName: 'Номер Телефону' },
    {
      field: 'uaSchooGrade',
      headerName: 'Клас в школі UA',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: VALID_GRADES,
      } as ISelectCellEditorParams,
    },
    {
      field: 'usSchooGrade',
      headerName: 'Клас в школі US',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: VALID_GRADES,
      } as ISelectCellEditorParams,
    },
    { field: 'adressStreet', headerName: 'Вулиця' },
    { field: 'adressTown', headerName: 'Місто' },
    { field: 'adressZipcode', headerName: 'Поштовий Код' },
    {
      field: 'adressState',
      headerName: 'Штат',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: VALID_STATES,
      } as ISelectCellEditorParams,
    },
    { field: 'parent1Email', headerName: 'Email батька' },
    { field: 'parent1FirstName', headerName: "Ім'я батька" },
    { field: 'parent1LastName', headerName: 'Прізвище батька' },
    { field: 'parent1PhoneNumber', headerName: 'Номер телефону батька' },
    { field: 'parent2FirstName', headerName: "Ім'я мами" },
    { field: 'parent2LastName', headerName: 'Прізвище мами' },
    { field: 'parent2Email', headerName: 'Email мами' },
    { field: 'parent2PhoneNumber', headerName: 'Номер телефону мами' },
    {
      field: 'roles',
      headerName: 'Ролі',
      editable: false,
      valueFormatter: params => params.value.join(', '),
    },
    {
      colId: 'payments',
      headerName: 'Оплати',
      editable: false,
      cellRenderer: paymentCellRender,
    },
  ]);

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef: ColDef = {
    filter: true,
    editable: authLevelAllow,
    cellClass: cellClass,
  };

  const myTheme = themeQuartz.withParams({
    browserColorScheme: 'light',
    headerFontSize: 14,
  });

  const theme = useMemo<Theme | 'legacy'>(() => {
    return myTheme;
  }, []);

  const onExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  }, []);

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: 'fitCellContents',
    };
  }, []);

  const rowSelection = useMemo<
    RowSelectionOptions | 'single' | 'multiple'
  >(() => {
    return {
      mode: 'multiRow',
      selectAll: 'currentPage',
    };
  }, []);

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const rows = event.api.getSelectedNodes();
    setSelectedRowData(rows);
  }, []);

  function cellClass(params: CellClassParams) {
    // Prevent calculated fields to be highlighted
    if (
      Object.values(NonHighlighColumNames).includes(
        params?.colDef?.headerName as NonHighlighColumNames,
      )
    ) {
      return '';
    }
    const curItem = data.find(d => d.id === params.data.id);
    const curKey = params.column.getColId() as keyof User;
    if (curKey === 'roles') {
      return '';
    }
    if (curItem && curItem[curKey as keyof User] === params.value) {
      return '';
    }
    return 'has-background-danger-light';
  }

  function onCellClickedHandler(event: CellClickedEvent) {
    switch (event.column.getId()) {
      case 'payments':
        setSelectedUser(event.data);
        setPaymentVisibles(true);
        break;
    }
  }
  //#endregion

  //#region Functionalities
  async function handleDBUpdate() {
    const infoLogTxt: string[] = [];
    const errorLogTxt: string[] = [];
    setLoading(true);

    try {
      const updatePromises = selectedRowData.map(async rowData => {
        if (rowData) {
          if (checkIfRowChanged(data, rowData.data)) {
            const userData = rowData.data;
            const vars: Omit<User, 'email' | 'username' | 'maxCapabilities'> = {
              id: userData?.id,
              plastId: userData?.plastId,
              firstName: formatOutput(userData?.firstName),
              lastName: formatOutput(userData?.lastName),
              childFirstNameUa: formatOutput(userData?.childFirstNameUa),
              childLastNameUa: formatOutput(userData?.childLastNameUa),
              dob: formatOutput(userData?.dob),
              stupin: formatOutput(userData.stupin),
              ulad: formatOutput(userData.ulad),
              phoneNumber: formatOutput(userData?.phoneNumber),
              uaSchooGrade: formatOutput(userData?.uaSchooGrade),
              usSchooGrade: formatOutput(userData?.usSchooGrade),
              adressState: formatOutput(userData?.adressState),
              adressStreet: formatOutput(userData?.adressStreet),
              adressTown: formatOutput(userData?.adressTown),
              adressZipcode: formatOutput(userData?.adressZipcode),
              parent1Email: formatOutput(userData?.parent1Email),
              parent1FirstName: formatOutput(userData?.parent1FirstName),
              parent1LastName: formatOutput(userData?.parent1LastName),
              parent1PhoneNumber: formatOutput(userData?.parent1PhoneNumber),
              parent2Email: formatOutput(userData?.parent2Email),
              parent2FirstName: formatOutput(userData?.parent2FirstName),
              parent2LastName: formatOutput(userData?.parent2LastName),
              parent2PhoneNumber: formatOutput(userData?.parent2PhoneNumber),
              parentSignature: formatOutput(userData?.parentSignature),
              headshot: formatOutput(userData?.headshot),
              roles: userData?.roles || [],
            };

            const { errors } = await updateProfile({
              variables: vars,
            });

            if (errors) {
              errorLogTxt.push(
                `Profile updated with ERROR for ${vars.id} ${vars.firstName} ${vars.lastName}`,
              );
            } else {
              infoLogTxt.push(
                `Profile updated successfully for ${vars.id} ${vars.firstName} ${vars.lastName}`,
              );
            }
          }
        }
      });

      await Promise.all(updatePromises);
      await onTableAction('updateDB');

      setInfo(infoLogTxt);
      setError(errorLogTxt);
    } catch (error) {
      setError(['Error updating profile']);
    } finally {
      setLoading(false);
    }
  }

  function handleBulkAction() {
    switch (bulkAction) {
      case VALID_ACTION.DOWNLOAD_DATA:
        onExport();
        break;

      case VALID_ACTION.BULK_CHANGE:
        if (selectedRowData.length > 0) {
          setBulkEditVisible(true);
        } else {
          setError(['Виберіть користувачів щоб обновити']);
        }

        // initChoice({
        //   title: 'Хочете Оновити Базу Даних',
        //   body: 'Ви впевнеші, що хочете оюновити базу даних,',
        //   fn: onExport,
        // });
        break;

      case VALID_ACTION.BULK_EMAIL_SEND:
        if (selectedRowData.length > 0) {
          setBulkEmailSendVisible(true);
        } else {
          setError(['Виберіть користувачів щоб відправити імейл']);
        }
        break;

      default:
        break;
    }
  }

  function handleBulkEditAction(data: User[]) {
    let newRowData: User[] = [...rowData];
    data.forEach(row => {
      newRowData = newRowData.filter(rw => rw.id !== row.id);
    });
    setRowData(() => [...newRowData, ...data]);
  }

  function parserBulkEmailToSend(): string[] {
    const data = selectedRowData.map(row => row.data.email);
    if (data.length > 0) {
      return data;
    }
    return [];
  }
  //#endregion

  //#region Choice
  function handleChoice(result: boolean) {
    if (result && choiceAction?.fn) {
      choiceAction.fn();
    }
    setChoiceVisible(false);
  }

  function initChoice(action: ChoiceAction) {
    setChoiceVisible(true);
    setChoiceAction(action);
  }
  //#endregion
  return (
    <>
      <p className="is-multiline">{info}</p>
      <ModalLoader isActive={loading} />

      <InfoErrorModal
        isActive={info.length > 0}
        title="Інформація"
        body={info}
        type="info"
        onClose={() => {
          setInfo([]);
        }}
      />

      <InfoErrorModal
        isActive={error.length > 0}
        title="Помилка"
        body={error}
        type="error"
        onClose={() => {
          setError([]);
        }}
      />

      <ModalChoice
        title={choiceAction.title}
        body={choiceAction.body}
        isActive={choiceVisible}
        onAction={handleChoice}
      />

      <ModalBulkDataUpdate
        data={selectedRowData}
        isActive={bulkEditVisible}
        onClose={() => setBulkEditVisible(false)}
        onAction={handleBulkEditAction}
      />

      <ModalSendEmailsDB
        emailArr={parserBulkEmailToSend()}
        isActive={bulkEmailSendVisible}
        onClose={() => setBulkEmailSendVisible(false)}
      />

      {paymentsVisible && (
        <ModalPaymentTable
          user={selectedUser}
          onClose={() => setPaymentVisibles(false)}
        />
      )}

      <Block className={style.container}>
        <div className={style.table_container}>
          <AgGridReact
            ref={gridRef}
            theme={theme}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={autoSizeStrategy}
            rowSelection={rowSelection}
            onSelectionChanged={onSelectionChanged}
            onCellClicked={onCellClickedHandler}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[5, 10, 20, 50, 100]}
          />
        </div>

        <Block className={classNames('px-4', style.bulk_action_container)}>
          <div className={style.select_bulk_actions}>
            <select
              className="select"
              value={bulkAction}
              onChange={e =>
                setBulkAction((e.target as HTMLSelectElement).value)
              }
            >
              <option
                value="0"
                disabled
                // selected
              >
                Вибери дію
              </option>

              <option value={VALID_ACTION.DOWNLOAD_DATA}>Скачачи дані</option>

              <option value={VALID_ACTION.BULK_CHANGE}>
                Оновити дані масово
              </option>

              <option value={VALID_ACTION.BULK_EMAIL_SEND}>
                Масова відправка імейлів
              </option>
            </select>

            <Button
              color="danger"
              onClick={() => handleBulkAction()}
              disabled={bulkAction === '0' || !authLevelAllow}
            >
              Виконати дію
            </Button>
          </div>

          <Button
            color="danger"
            disabled={selectedRowData.length <= 0 || !authLevelAllow}
            onClick={() =>
              initChoice({
                title: 'Хочете Оновити Базу Даних',
                body: 'Ви впевнеші, що хочете оюновити базу даних?',
                fn: handleDBUpdate,
              })
            }
          >
            Оновити Базу Даних
          </Button>
        </Block>
      </Block>
    </>
  );
};
