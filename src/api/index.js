import axios from 'axios';
import { baseUrl, headers } from '../store/endpoint';

const employeesUrl = baseUrl + "/employees";
const employeeUrl = employeeUrl +"/employee";
const customersUrl = baseUrl +"/customers";
const customerUrl = customersUrl+ "/customer"
const servicesUrl = baseUrl + "/services";

export const getAllEmployeesResponse = ()=>{
    return axios.get(employeesUrl,{
            headers:headers
        }) .then((response)=>{
            return response;
        }).catch((e)=>{
            console.error(e);
            return {errors: e.message};
        })       
}

export const getAllCustomersResponse = () =>{
    return axios.get(customersUrl, {
            headers: headers
        }).then((response)=>{
            return response;  
        }).catch((e)=>{
            console.error(e);
            return {errors: e.message};
        })
}


export const submitCustomerResponse =  (data) => {
        return axios.post(customersUrl, data).then((response)=>{       
            return response;
        }).catch((e)=>{
            console.error(e);
            return {errors: e.message};
        })
      
}


export const deleteCurrentCustomerResponse = (id)=>{
    //no header needed for now, check when auth is required
    let deleteUrl = customersUrl+ "/delete/"+ id;
    return axios.delete(deleteUrl).then((response)=>{
        return response;
    }).catch(e=>{
        console.error(e);
        return {errors: e.message};
    })
}

export const getAllServicessResponse = () =>{
    return axios.get(servicesUrl, {
            headers: headers
        }).then((response)=>{
            return response;  
        }).catch((e)=>{
            console.error(e);
            return {errors: e.message};
        })
}

export default axios.create({
    baseURL: baseUrl,
    headers: headers,
});
