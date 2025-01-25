import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
  {
    width: 150,
    label: 'Prénom',
    dataKey: 'first_name',
  },
  {
    width: 150,
    label: 'Nom',
    dataKey: 'last_name',
  },
  {
    width: 150,
    label: 'Téléphone',
    dataKey: 'phone',
  },
  {
    width: 250,
    label: 'Email',
    dataKey: 'email',
  },
];

function UsersTable({ users }) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                style={{ width: column.width }}
                align="left"
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.dataKey} align="left">
                  {column.dataKey === 'phone' ? (
                    <a href={`tel:${user[column.dataKey]}`} style={{ textDecoration: 'underline' }}>
                      {user[column.dataKey]}
                    </a>
                  ) : column.dataKey === 'email' ? (
                    <a href={`mailto:${user[column.dataKey]}`} style={{ textDecoration: 'underline' }}>
                      {user[column.dataKey]}
                    </a>
                  ) : (
                    user[column.dataKey]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;