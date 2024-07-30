import React from 'react'
import { useState, useEffect } from 'react';
import  { getAllEmployees } from "../api";
import Table from '../components/Table';
const Employees = () => {
    const[customers, setCustomers] = useState();

    const  getCustomers =async()=>{
        const data = await getAllEmployees();
        setCustomers(data);   
    }
    useEffect(()=>{
        getCustomers();
    },[])
  return (
    <div>
        {/* <h2 className='text-center'>Employees</h2> */}
        <Table data = {customers}/>
    </div>
  )
}

export default Employees