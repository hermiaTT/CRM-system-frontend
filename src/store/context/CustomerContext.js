import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from '../reducer/customerReducer';
import customerReducer from '../reducer/customerReducer';
import {deleteCurrentCustomerResponse, getAllCustomersResponse, submitNewCustomerResponse } from '../../api';

const CustomerContext = createContext(initialState);

export const CustomerProvider = ({children}) => {
    const[state, dispatch] = useReducer(customerReducer, initialState);
    
    //get all customers
    const getAllCustomers = async () => {
        const response = await getAllCustomersResponse();
        if (response && response.data && response.status === 200){
            response.data.forEach(item=>{
                let fullName = item.firstName + " "+item.lastName;
                item.fullName = fullName;
            })
            dispatch({type: "GET_CUSTOMERS_SUCCESS", payload: response.data});
        }else{
            dispatch({ type: "GET_CUSTOMERS_FAILURE", errors: response.errors});       
        }
    }

    const submitNewCustomer =async(data)=>{
        const response = await submitNewCustomerResponse(data);
        if (response && response.data && response.status === 201){
            getAllCustomers();
            // dispatch({ type: "SUBMIT_CUSTOMER_SUCCESS", payload: response.data })
            dispatch({ type: "CLOSE_MODAL"});
        }
        else{
            console.log(response.errors);
            dispatch({ type: "SUMBIT_CUSTOMER_FAILURE", errors: response.errors});
        }
    };

    const deleteCurrentCustomer = async(data)=>{
        // Optimistic update
        dispatch({ type: "DELETE_CUSTOMER_OPTIMISTIC", payload: data });
        const response = await deleteCurrentCustomerResponse(data);
        if (response && response.status === 200) {
            // Optionally, you could refresh the entire list to ensure data consistency
            getAllCustomers();
        } else {
            console.log(response.errors);
            dispatch({ type: "DELETE_CUSTOMER_FAILURE", payload: response.errors });
        }
    }

    const contextValue = {
        ...state,
        dispatch,
        submitNewCustomer,
        getAllCustomers,
        deleteCurrentCustomer
       
    }
    return(
        <CustomerContext.Provider value={contextValue}>
            {children}
        </CustomerContext.Provider>
    );
};


const useCustomer = () => {
    const context = useContext(CustomerContext);

    if(context === undefined){
        throw new Error(" useCustomer must be used within CustomerProvider");
    }
    return context;   
}

export default useCustomer;
