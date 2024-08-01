import React from 'react'
import { CustomersProvider } from './context/CustomersContext'
import { EmployeesProvider } from './context/EmployeesContext'

const AppProvider = ({children}) => {
  return (
    <CustomersProvider>
        <EmployeesProvider>
            {children}
        </EmployeesProvider>
    </CustomersProvider>
  )
}

export default AppProvider