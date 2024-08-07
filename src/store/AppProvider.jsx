import React from 'react'
import { EmployeesProvider } from './context/EmployeesContext'
import { CustomerProvider } from './context/CustomerContext'

const AppProvider = ({children}) => {
  return (
        <EmployeesProvider>
          <CustomerProvider>
            {children}
          </CustomerProvider>
        </EmployeesProvider>
  )
}

export default AppProvider