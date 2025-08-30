import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  CheckboxEditorModule,
} from 'ag-grid-community';
import { Container } from 'react-bulma-components';
import { AgGridReact } from 'ag-grid-react';
import { Theme } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { PaymentTableData } from '../../types/PaymentsTypes';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  CheckboxEditorModule,
]);

type Prop = {
  data: PaymentTableData[] | undefined;
  compact?: boolean;
};

export const PaymentTable: React.FC<Prop> = ({ data, compact = false }) => {
  const [rowData, setRowData] = useState<PaymentTableData[] | undefined>(data);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const gridRef = useRef<AgGridReact<PaymentTableData>>(null);
  const gridStyle = useMemo(() => ({ height: '65vh', width: '100%' }), []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: false,
    };
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      hide: compact,
      field: 'userid',
      headerName: 'User ID',
      cellDataType: 'text',
      flex: 1,
    },
    {
      hide: compact,
      field: 'firstName',
      headerName: "Ім'я",
      cellDataType: 'text',
    },
    {
      hide: compact,
      field: 'lastName',
      headerName: 'Прізвище',
      cellDataType: 'text',
    },
    {
      field: 'amount',
      headerName: 'Сума',
    },
    {
      field: 'date',
      headerName: 'Дата',
    },
    {
      field: 'type',
      headerName: 'Тип платежу',
    },
    {
      field: 'comments',
      headerName: 'Кометнар',
    },
  ]);

  const myTheme = themeQuartz.withParams({
    browserColorScheme: 'light',
    headerFontSize: 14,
  });

  const theme = useMemo<Theme | 'legacy'>(() => {
    return myTheme;
  }, []);

  return (
    <Container>
      <div style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          theme={theme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>
    </Container>
  );
};
