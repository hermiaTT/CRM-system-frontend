import React, { useEffect, useState } from 'react';
import useCustomers from '../../store/context/CustomersContext';
import DataTable from '../../components/DataTable';
import { Box } from '@mui/material';
import Form from 'react-bootstrap/Form';
import AddCustomerModal from '../../components/AddCustomerModal';
import Edit from '../customer/edit';
import useCustomer from '../../store/context/CustomerContext';



 const Customers = ()=> {
    const { customers, loading, error, tableColumn, getAllCustomers } = useCustomers();
    const { dispatch, showModal } = useCustomer();
    const [isUpdated, setIsUpdated] = useState(false);


    useEffect(()=>{
      getAllCustomers();
    },[])

    useEffect(()=>{
      if(isUpdated){
        getAllCustomers();
        setIsUpdated(false);
      }
    },[isUpdated])


    const onOpen = ()=>{
      dispatch({ type: "OPEN_MODAL" });
    }
    
    const onClose = ()=>{
      dispatch({ type: "CLOSE_MODAL" });
    }
    
    const onDeleteCustomer = (data)=> {
      console.log(data)
      
    }
    return (
      <Box >
        <DataTable 
          rows = {customers} 
          columns={tableColumn} 
          header = {'Customer List'}
          onAdd = {onOpen}
          onDelete = {onDeleteCustomer}/>

        <AddCustomerModal
          show ={showModal}
          onClose={onClose}
          onSubmit={onOpen}
        >
          <Edit onCustomerAdded={() => setIsUpdated(true)}/>
        </AddCustomerModal>
          
        
        </Box>
    );
}

export default  Customers;
