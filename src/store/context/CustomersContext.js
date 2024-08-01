import React, { createContext, useContext, useReducer } from "react";
import customersReducer, { initialState } from "../reducer/customersReducer";
import { getAllCustomersResponse } from "../../api";

const CustomersContext = createContext(initialState);

export const CustomersProvider = ({children}) => {
    const [state, dispatch] = useReducer(customersReducer, initialState);

    const getAllCustomers = async () => {
        try{
            const data = await getAllCustomersResponse();
            dispatch({
                type: "GET_CUSTOMERS_SUCCESS",
                payload: data
            });
            
        } catch (error){
            dispatch({
                type: "GET_CUSTOMERS_FAILURE",
                payload: error
            });
            
        }
    }

    const contextValue ={
        ...state,
        getAllCustomers,
    };

    return (
        <CustomersContext.Provider value = {contextValue}>
            {children}
        </CustomersContext.Provider>
    );
};

//usage 

const useCustomers = () => {
    const context = useContext(CustomersContext);

    if(context === undefined){
        throw new Error(" useCustomers must be used within CustomersProvider");
    }

    return context;
}

export default useCustomers;