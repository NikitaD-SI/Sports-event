import { styled } from '@mui/material/styles';
import { Paper, Table, TableContainer, TableHead } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import React from 'react'
import { WindowRounded } from '@mui/icons-material';

const Admin = () => {

    let user = JSON.parse(window.localStorage.getItem("user"));
    let checkRole = user.role;

  return (
    <>
      Hi
    </>
  )
}

export default Admin;