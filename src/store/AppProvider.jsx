import React from 'react'
import { CustomersProvider } from './context/CustomersContext'
import { EmployeesProvider } from './context/EmployeesContext'
import { CustomerProvider } from './context/CustomerContext'

const AppProvider = ({children}) => {
  return (
    <CustomersProvider>
        <EmployeesProvider>
          <CustomerProvider>
            {children}
          </CustomerProvider>
        </EmployeesProvider>
    </CustomersProvider>
  )
}

export default AppProvider