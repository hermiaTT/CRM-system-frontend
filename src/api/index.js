import axios from 'axios';
import { baseUrl, headers } from '../store/endpoint';

const employeesUrl = baseUrl + "/employees";
const employeeUrl = baseUrl +"/employees/employee";
const customersUrl = baseUrl +"/customers";

export const getAllEmployeesResponse = ()=>{
    return axios.get(employeesUrl,{
            headers:headers
            })
            .then((response)=>{
                if(response.status === 200){
                    return response.data;
                }
            }).catch((e)=>{
                console.error(e);
                return {erros: e.message};
            })

            
}

export const getAllCustomersResponse = () =>{
    return axios.get(customersUrl, {
        headers: headers
    }).then((response)=>{
        if(response.status === 200){
            return response.data;
        }
    }).catch((e)=>{
        console.error(e);
        return {erros: e.message};
    })
}

export default axios.create({
    baseURL: baseUrl,
    headers: headers,
});
