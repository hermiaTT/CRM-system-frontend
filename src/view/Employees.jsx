import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import useEmployees from '../store/context/EmployeesContext';


const Employees = () => {
  const { employees, loading, error, tableColumn, getAllEmployees} = useEmployees();

  useEffect(() => {
    getAllEmployees();
  }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



  return (
    <div>
        
        <DataTable columns={tableColumn} rows={employees} header = {'Employees List'} />
    
        
    </div>
  )
}

export default Employees