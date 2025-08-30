import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
  CheckboxEditorModule,
} from 'ag-grid-community';
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  CheckboxEditorModule,
]);
import { Block, Button, Container, Form } from 'react-bulma-components';
import {
  AttandancSheetsData,
  AttendanceTableData,
  TableModes,
} from '../../types/Attandance';
import { AgGridReact } from 'ag-grid-react';
import { validateDate } from '../../utils/dateHelper';

type Prop = {
  id: number;
  sheetDate: string;
  data: AttendanceTableData[] | undefined;
  mode?: TableModes;
  onAction?: (tableData: AttandancSheetsData) => void;
};

export const AttandanceTable: React.FC<Prop> = ({
  id,
  sheetDate,
  data,
  mode = TableModes.VIEW,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAction = () => undefined,
}) => {
  const [ulads, setUlads] = useState<Set<string>>(new Set());
  const [uladSelected, setUladSelected] = useState('All');

  const [dateSelected, setDateSelected] = useState(validateDate(sheetDate));
  const [rowData, setRowData] = useState<AttendanceTableData[] | undefined>(
    data,
  );
  const gridRef = useRef<AgGridReact<AttendanceTableData>>(null);
  const gridStyle = useMemo(() => ({ height: '65vh', width: '100%' }), []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: false,
    };
  }, []);
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'name',
      headerName: "Ім'я",
      cellDataType: 'text',
      flex: 1,
      suppressSizeToFit: true,
    },
    {
      field: 'present',
      headerName: 'Присутній',
      cellDataType: 'boolean',
      editable: mode !== TableModes.VIEW,
      maxWidth: 100,
    },
  ]);
  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);

  useEffect(() => {
    if (uladSelected === 'All') {
      setRowData(data);
    } else {
      const filtered =
        data &&
        (data as AttendanceTableData[]).filter(
          (item: AttendanceTableData) => item.ulad === uladSelected,
        );
      setRowData(filtered);
    }
  }, [uladSelected]);

  useEffect(() => {
    setUlads(
      new Set(
        data?.map(user => user.ulad).filter((item): item is string => !!item),
      ),
    );

    setRowData(data);

    setDateSelected(validateDate(sheetDate));
  }, [data]);

  function handleAction() {
    return onAction({
      id: id,
      titleDate: dateSelected,
      body: JSON.stringify(data),
    });
  }

  return (
    <Container className="p-5">
      <Block
        className="is-flex  is-justify-content-space-between"
        style={{ width: '100%' }}
      >
        <Block className="m-0">
          <Form.Field
            horizontal
            className="is-flex is-flex-direction-column is-align-items-center "
          >
            <Form.Label className="mr-2">Дата звіту</Form.Label>

            <Form.Control>
              <Form.Input
                type="date"
                value={dateSelected}
                disabled={mode === TableModes.VIEW}
                onChange={e =>
                  setDateSelected(
                    new Date(e.target.value).toISOString().split('T')[0],
                  )
                }
              ></Form.Input>
            </Form.Control>
          </Form.Field>
        </Block>

        <Block className="m-0">
          <Form.Field
            horizontal
            className="is-flex is-flex-direction-column is-align-items-center "
          >
            <Form.Label className="mr-2">Улад</Form.Label>

            <Form.Control>
              <Form.Select onChange={e => setUladSelected(e.target.value)}>
                <option value="All">All</option>
                {Array.from(ulads).map((item: string, index: number) => {
                  return (
                    <option
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Control>
          </Form.Field>
        </Block>
      </Block>

      <div style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          autoSizeStrategy={autoSizeStrategy}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>

      {(mode === TableModes.EDIT || mode === TableModes.CREATE) && (
        <Button
          fullwidth
          color={'danger'}
          className="mt-2"
          onClick={handleAction}
        >
          Записати
        </Button>
      )}
    </Container>
  );
};
