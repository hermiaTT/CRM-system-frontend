import React, { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { Box } from '@mui/material';
import DataModal from '../../components/Modal';
import useCustomer from '../../store/context/CustomerContext';
import { customersTableColumn } from '../../data/data-header-info';
import Edit from './edit.jsx';


 const Customers = ()=> {
    const { customers, showModal, dispatch , getAllCustomers, deleteCurrentCustomer } = useCustomer();
    const tableColumn = customersTableColumn;
    useEffect(()=>{
      getAllCustomers();
    },[])

    const onOpen = ()=>{
      dispatch({ type: "OPEN_MODAL" });
    }
    
    const onClose = ()=>{
      dispatch({ type: "CLOSE_MODAL" });
    }
    
    const onDeleteCustomer = (data)=> {
      deleteCurrentCustomer(data);   
    }
    
    const onEditCustomer = (value) => {
      dispatch({ type: "OPEN_EDIT_CUSTOMER", payload:{ customer: value} });
      console.log(value);
    }

    return (
      <Box >
        <DataTable 
          rows = {customers} 
          header = {'Customer List'}
          onAdd = {onOpen}
          columns = {tableColumn}
          onDelete = {onDeleteCustomer}
          onEdit = {onEditCustomer}/>

        <DataModal
          show ={showModal}
          onClose={onClose}
          onSubmit={onOpen}
        >
          <Edit />
        </DataModal>
          
        
        </Box>
    );
}

export default  Customers;
