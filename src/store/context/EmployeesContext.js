import React, { createContext, useContext, useReducer } from "react";
import employeesReducer, { initialState } from "../reducer/employeesReducer";
import { getAllEmployeesResponse } from "../../api";

const EmployeesContext = createContext(initialState);

export const EmployeesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, initialState);

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
    <EmployeesContext.Provider value={contextValue}>
      {children}
    </EmployeesContext.Provider>
  );
};

//usage
const useEmployees = () => {
  const context = useContext(EmployeesContext);

  if (context === undefined) {
    throw new Error("useEmployees must be used within EmployeesProvider");
  }

  return context;
};

export default useEmployees;
