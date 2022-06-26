import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BalanceResponseInterface } from '../api/covalantApi';

export const createBalanceTableData = (balanceRes: BalanceResponseInterface) => {
    var rows = new Array<any>();
    balanceRes.items.forEach(item => {
        const row = createData(item.contract_name, item.contract_ticker_symbol, item.balance, item.quote );
        rows.push(row);
    })
    return rows;

}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  ticker: string,
  balance: number,
  marketValue: number,
) {
  return { name, ticker, balance, marketValue };
}

const rows = [
  createData('Ether', 'eth', 100, 100)
];

export default function BalanceTable(props: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Ticket</StyledTableCell>

            <StyledTableCell align="right">Balance</StyledTableCell>
            <StyledTableCell align="right">Market Value&nbsp;($USD)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {console.log("wtf",props)}
          {props.rows.map((row: any) => (
            <StyledTableRow key={row.name}>
  
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.ticker}</StyledTableCell>
              <StyledTableCell align="right">{row.balance}</StyledTableCell>
              <StyledTableCell align="right">{row.marketValue}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}