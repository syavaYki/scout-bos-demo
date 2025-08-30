import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  CellClickedEvent,
  ClientSideRowModelModule,
  ColDef,
  IDateFilterParams,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
} from 'ag-grid-community';
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
]);
import { Block, Button, Container, Heading } from 'react-bulma-components';
import {
  deleteAttandanceSheetAPI,
  getAttendanceSheetsAPI,
} from '../../api/getAttandanceSheets';
import { attendanceParser } from '../../utils/helperAttendance';
import { AttandancSheetsData, TableModes } from '../../types/Attandance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ModalError } from '../../components/ModalError';
import { ModalSuccess } from '../../components/ModalSuccess';
import { ModalChoice } from '../../components/ModalChoice';
import { useAppSelector } from '../../app/hooks';
import { AuthLevels } from '../../types/AuthLevels';

function viewCellRender() {
  return (
    <FontAwesomeIcon
      icon={faEye}
      size="lg"
      className="has-text-success"
    />
  );
}

function editCellRender() {
  return (
    <FontAwesomeIcon
      icon={faPenToSquare}
      size="lg"
      className="has-text-primary"
    />
  );
}

function deleteCellRender() {
  return (
    <FontAwesomeIcon
      icon={faTrashCan}
      size="lg"
      className="has-text-danger"
    />
  );
}

export const AttandancePage = () => {
  const { accessLevel } = useAppSelector(state => state.auth);
  const authLevelAllow =
    accessLevel === AuthLevels.ADMIN ||
    accessLevel === AuthLevels.AUTOR ||
    accessLevel === AuthLevels.VYHOVNYK ||
    accessLevel === AuthLevels.PLASTUN_SENIOR;
  const [error, setErro] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [toDeleteSheet, setToDeleteSheet] = useState<
    AttandancSheetsData | undefined
  >();
  const { data: attndData, refetch } = getAttendanceSheetsAPI();
  const [deleteSheet] = deleteAttandanceSheetAPI();
  const gridRef = useRef<AgGridReact<AttandancSheetsData>>(null);
  const [rowData, setRowData] = useState<AttandancSheetsData[]>();
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'titleDate',
      headerName: 'Date',
      cellDataType: 'text',
      filter: 'agDateColumnFilter',
      filterParams: {
        buttons: ['apply', 'reset'],
        closeOnApply: true,
        includeBlanksInEquals: false,
        includeBlanksInNotEqual: false,
        includeBlanksInLessThan: false,
        includeBlanksInGreaterThan: false,
        includeBlanksInRange: false,
      } as IDateFilterParams,
      flex: 2,
      width: 100,
    },
    {
      field: 'view',
      cellRenderer: viewCellRender,
    },
    {
      hide: !authLevelAllow,
      field: 'edit',
      cellRenderer: editCellRender,
    },
    {
      hide: !authLevelAllow,
      field: 'delete',
      cellRenderer: deleteCellRender,
    },
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (attndData) {
      setRowData(attendanceParser(attndData));
    }
  }, [attndData]);

  const gridStyle = useMemo(() => ({ height: '50vh', width: '100%' }), []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      editable: false,
    };
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

  function onCellClickedHandler(event: CellClickedEvent) {
    switch (event.column.getId()) {
      case TableModes.VIEW:
        navigate({
          pathname: `${location.pathname}/${event.data.id}`,
          search: createSearchParams({ mode: TableModes.VIEW }).toString(),
        });
        break;
      case TableModes.EDIT:
        navigate({
          pathname: `${location.pathname}/${event.data.id}`,
          search: createSearchParams({ mode: TableModes.EDIT }).toString(),
        });
        break;

      case TableModes.DELETE:
        setChoiceVisible(true);
        setToDeleteSheet(event.data);

        break;
    }
  }

  function handleNewSheet() {
    navigate({
      pathname: `${location.pathname}/99999`,
      search: createSearchParams({ mode: TableModes.CREATE }).toString(),
    });
  }

  function handleChoice(result: boolean) {
    if (result) {
      deleteSheet({
        variables: {
          id: toDeleteSheet?.id,
        },
      })
        .then(() => {
          setSuccessMessage(
            `Ви успішно видалили запис ${toDeleteSheet?.titleDate}`,
          );
          refetch();
        })
        .catch(deleteSheetError => {
          setErro(deleteSheetError.message);
          console.error('Error during deleteSheet mutation:', deleteSheetError);
        });
    }

    setToDeleteSheet(() => undefined);
    setChoiceVisible(false);
  }

  return (
    <>
      <ModalError
        title="Виникла помилка!"
        body={`Помилка, спробуйтн обновити браузер, якщо помилка продовжить з'являтися, тоді зв'яжіться з адміністратором. Помилка: ${error}`}
        isActive={!!error}
        onClose={() => setErro('')}
      />

      <ModalSuccess
        title="Вітаю все вийшло!"
        body={successMessage}
        isActive={!!successMessage && !error}
        onClose={() => {
          setSuccessMessage('');
        }}
      />

      <ModalChoice
        title="Are you sure"
        body="Are tottaly sure?"
        isActive={choiceVisible}
        onAction={handleChoice}
      />

      <Container className="p-5">
        <Heading>Відвідування</Heading>
        <Block>
          <Button
            onClick={handleNewSheet}
            disabled={!authLevelAllow}
          >
            Створити нове відвідування
          </Button>
        </Block>

        <Block>
          <div style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              autoSizeStrategy={autoSizeStrategy}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50, 100]}
              onCellClicked={onCellClickedHandler}
            />
          </div>
        </Block>
      </Container>
    </>
  );
};
