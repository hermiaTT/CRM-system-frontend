import React, { createContext } from "react"
import { initialState } from "../reducer/employeesReducer";

export const EmployeeContext = createContext(initialState);