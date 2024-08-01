import React, { createContext, useContext, useReducer } from "react";
import customersReducer, { initialState } from "../reducer/customersReducer";
import { getAllCustomersResponse } from "../../api";
import { customerKeys } from "../../data/data-header-info";
const CustomersContext = createContext(initialState);

export const CustomersProvider = ({children}) => {
    const [state, dispatch] = useReducer(customersReducer, initialState);

    const getAllCustomers = async () => {
        try{
            const data = await getAllCustomersResponse();

            const formattedData = data && data.map(item=>{
                const formattedItem = {};
                for(const [key, formatter] of Object.entries(customerKeys)){
                    formattedItem[key] = key === 'pastServices'
                    ? formatter(item) 
                    : formatter(item);
                }
                return formattedItem;
            })


            dispatch({
                type: "GET_CUSTOMERS_SUCCESS",
                payload: formattedData
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