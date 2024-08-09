import React, { useEffect } from 'react'
import useService from '../../store/context/ServiceContext';
import { Box } from '@mui/material';
import ServiceTable from '../../components/ServiceTable';
import { servicesTableColumn } from '../../data/data-header-info';
import DataModal from '../../components/Modal';

const Services = () => {
  const {services,service, getAllServices,showModal, dispatch} = useService();
  const tableColumn = servicesTableColumn;
  
  useEffect(()=>{
    getAllServices();
  },[])

  const onOpen = ()=>{
    dispatch({ type: "OPEN_MODAL" });
  }
  
  const onClose = ()=>{
    dispatch({ type: "CLOSE_MODAL" });
  }

  const onEditService = (value) => {
    dispatch({type: "OPEN_EDIT_SERVICE", payload: {service: value}});
  }
  
  
  return (
    <Box>
      <ServiceTable 
        columns={tableColumn} 
        rows={services}
        onEdit={onEditService}/>

      <DataModal
        show = {showModal}
        onClose = {onClose}
        onSubmit = {onOpen}>
          <div>{console.log(service)}</div>
        </DataModal>
    </Box>
  )
}

export default Services