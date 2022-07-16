/* eslint-disable import/no-extraneous-dependencies */
import { styled } from '@mui/system';
import { Table } from '@mui/material';

type Props = {};

const BoardTable = styled(Table)<Props>(() => ({
  maxWidth: '45rem',
  '& .MuiTableCell-root': {
    border: '1px solid rgba(224, 224, 224, 1)',
  },
}));

export default BoardTable;
