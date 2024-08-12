import React, { createContext, useContext, useReducer } from "react";
import { initialState } from "../reducer/serviceReducer";
import serviceReducer from "../reducer/serviceReducer";
import { getAllServicessResponse, submitServiceResponse } from "../../api";
import { formatDateEpoch, formateDate } from "../../util";

const ServiceContext = createContext(initialState);

export const ServiceProvider = ({children}) => {
    const [state, dispatch] = useReducer(serviceReducer, initialState)
    const convertDate = (services) => {
        services.forEach(service => {
            service.serviceDate = formateDate(service.serviceDate);
        });
    }
    const getAllServices = async()=>{
        const response = await getAllServicessResponse();
        if(response && response.data && response.status === 200){
            let data=  response.data;
            convertDate(data);
            
            dispatch({type: "GET_SERVICES_SUCCESS", payload: data});
        }else{
            dispatch({type: "GET_SERVICES_FAILURE", errors: response.errors});   
        }
    }

    const submitService = async(data)=> {
        if(data.serviceDate){
            data.serviceDate = formatDateEpoch(data.serviceDate);
        }
        const response = await submitServiceResponse(data);
        if(response && response.data && response.status === 201){
            getAllServices();
            dispatch({ type: "CLOSE_MODAL"});
        }else{
            console.log(response.errors);
            dispatch({ type: "SUMBIT_SERVICE_FAILURE", errors: response.errors});
        }

        
        console.log(response);
    }
    const contextValue = {
        ...state,
        dispatch,
        getAllServices,
        submitService
    }

    return (
        <ServiceContext.Provider value = {contextValue}>
            {children}
        </ServiceContext.Provider>
    )
}

const useService = ()=> {
    const context = useContext(ServiceContext);

    if(context === undefined){
        throw new Error(" useService must be used within CustomerProvider");
    }
    return context;   
}

export default useService;      