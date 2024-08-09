import React, { createContext, useContext, useReducer } from "react";
import employeeReducer, { initialState } from "../reducer/employeeReducer";
import { getAllEmployeesResponse } from "../../api";

const EmployeeContext = createContext(initialState);

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const getAllEmployees = async () => {

    const response = await getAllEmployeesResponse();
    if (response && response.data && response.status === 200){
      response.data.map(item=>{
        let fullName = item.firstName + " "+item.lastName;
        item.fullName = fullName
      })
      dispatch({ type: "GET_EMPLOYEES_SUCCESS", payload: response.data });
    }else {
      dispatch({ type: "GET_EMPLOYEES_FAILURE", errors: response.errors});
    }
  };

  const contextValue = {
    ...state,
    getAllEmployees,
  };

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

//usage
const useEmployee = () => {
  const context = useContext(EmployeeContext);

  if (context === undefined) {
    throw new Error("useEmployees must be used within EmployeesProvider");
  }

  return context;
};

export default useEmployee;
