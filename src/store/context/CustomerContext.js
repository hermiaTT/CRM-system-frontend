import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from '../reducer/customerReducer';
import customerReducer from '../reducer/customerReducer';
import { submitNewCustomerResponse } from '../../api';

const CustomerContext = createContext(initialState);

export const CustomerProvider = ({children}) => {
    const[state, dispatch] = useReducer(customerReducer, initialState);

    const submitNewCustomer =async(data)=>{
        try{
            const response = await submitNewCustomerResponse(data);
            if (response){
                dispatch({
                    type: "SUBMIT_CUSTOMER_SUCCESS",
                    payload: response
                })
                return true;
                
            }
            else{
                console.log(response.errors);
                dispatch({
                    type: "SUMBIT_CUSTOMER_FAILURE",
                    payload: response.errors
                });
            }
        } catch(error){
            dispatch({
                type: "SUMBIT_CUSTOMER_FAILURE",
                payload: error.message
            });
        }
        return false;

    };

    const contextValue = {
        ...state,
        dispatch,
        submitNewCustomer,
       
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
