import React from 'react'
import { EmployeeProvider } from './context/EmployeeContext'
import { CustomerProvider } from './context/CustomerContext'
import { ServiceProvider } from './context/ServiceContext'

const AppProvider = ({children}) => {
  return (
        <EmployeeProvider>
          <CustomerProvider>
            <ServiceProvider>
              {children}
            </ServiceProvider>
          </CustomerProvider>
        </EmployeeProvider>
  )
}

export default AppProvider