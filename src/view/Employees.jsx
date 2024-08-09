import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import useEmployee from '../store/context/EmployeeContext';
import { employeesTableColumn } from '../data/data-header-info';
import { Box } from '@mui/material';


const Employees = () => {
  const { employees, loading, error, getAllEmployees} = useEmployee();
  const tableColumn = employeesTableColumn;
  useEffect(() => {
    getAllEmployees();
  }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



  return (
    <Box>   
        <DataTable columns={tableColumn} rows={employees} header = {'Employees List'} />  
    </Box>
  )
}

export default Employees