/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import BoardTable from '../UI/BoardTable';
import ShipPiece from './ShipPiece';

import { makeData } from '../../lib/index';

type Cols = {
  colNum?: number;
  colA?: number;
  colB?: number;
  colC?: number;
  colD?: number;
  colE?: number;
  colF?: number;
  colG?: number;
  colH?: number;
  colI?: number;
  colJ?: number;
};

type Props = {
  boardData: {
    missed: any[];
    ships: any;
  };
  onTogglePiece: (coord: [string, number]) => void;
};

export default function Board({ boardData, onTogglePiece }: Props) {
  const checkboxCell = (table: any) => (
    <ShipPiece
      value={table.cell.value}
      col={table.column}
      row={table.cell.row}
      onTogglePiece={(coord: [string, number]) => onTogglePiece(coord)}
    />
  );

  const columns: Column<Readonly<Cols>>[] = useMemo(
    () => [
      {
        Header: '',
        accessor: 'colNum',
      },
      {
        Header: 'A',
        accessor: 'colA',
        Cell: checkboxCell,
      },
      {
        Header: 'B',
        accessor: 'colB',
        Cell: checkboxCell,
      },
      {
        Header: 'C',
        accessor: 'colC',
        Cell: checkboxCell,
      },
      {
        Header: 'D',
        accessor: 'colD',
        Cell: checkboxCell,
      },
      {
        Header: 'E',
        accessor: 'colE',
        Cell: checkboxCell,
      },
      {
        Header: 'F',
        accessor: 'colF',
        Cell: checkboxCell,
      },
      {
        Header: 'G',
        accessor: 'colG',
        Cell: checkboxCell,
      },
      {
        Header: 'H',
        accessor: 'colH',
        Cell: checkboxCell,
      },
      {
        Header: 'I',
        accessor: 'colI',
        Cell: checkboxCell,
      },
      {
        Header: 'J',
        accessor: 'colJ',
        Cell: checkboxCell,
      },
    ],
    []
  );

  const data = useMemo(() => makeData(boardData), [boardData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <BoardTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()} align="center">
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} data-testid="board">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TableCell
                  {...cell.getCellProps()}
                  padding="none"
                  align="center"
                >
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </BoardTable>
  );
}
