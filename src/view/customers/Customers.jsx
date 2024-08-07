import React, { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { Box } from '@mui/material';
import AddCustomerModal from '../../components/AddCustomerModal';
import Edit from '../customer/edit';
import useCustomer from '../../store/context/CustomerContext';



 const Customers = ()=> {
    const { customers, tableColumn, showModal, dispatch , getAllCustomers, deleteCurrentCustomer } = useCustomer();
   
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
          columns={tableColumn} 
          header = {'Customer List'}
          onAdd = {onOpen}
          onDelete = {onDeleteCustomer}
          onEdit = {onEditCustomer}/>

        <AddCustomerModal
          show ={showModal}
          onClose={onClose}
          onSubmit={onOpen}
        >
          <Edit />
        </AddCustomerModal>
          
        
        </Box>
    );
}

export default  Customers;
