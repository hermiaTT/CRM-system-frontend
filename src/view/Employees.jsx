import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import useEmployees from '../store/context/EmployeesContext';


const Employees = () => {
  const { employees, loading, error, getAllEmployees} = useEmployees();

  useEffect(() => {
    getAllEmployees();
  }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



  return (
    <div>
        
        <Table data={employees}/>
    
        
    </div>
  )
}

export default Employees