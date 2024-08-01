import React, { createContext, useContext, useReducer } from "react";
import employeesReducer, { initialState } from "../reducer/employeesReducer";
import { getAllEmployeesResponse } from "../../api";

const EmployeesContext = createContext(initialState);

export const EmployeesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, initialState);

  const getAllEmployees = async () => {
    try {
      const data = await getAllEmployeesResponse();
      dispatch({
        type: "GET_EMPLOYEES_SUCCESS",
        payload: data
      });
    } catch (error) {
      dispatch({
        type: "GET_EMPLOYEES_FAILURE",
        payload: error.message
      });
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
