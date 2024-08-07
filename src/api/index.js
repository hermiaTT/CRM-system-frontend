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
            })
            .then((response)=>{
                if(response.status === 200){
                    return response.data;
                }
            }).catch((e)=>{
                console.error(e);
                return {errors: e.message};
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
        return {errors: e.message};
    })
}

// export const submitNewCustomerResponse = async (data) => {
//     try {
//         const response = await fetch(customersUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             return responseData;
//         } else {
//             const errorData = await response.json();
//             console.error('Error response:', errorData);
//             return { errors: response.statusText };
//         }
//     } catch (error) {
//         console.error('Fetch error:', error);
//         return { errors: error.message };
//     }
// }
export const submitNewCustomerResponse =  (data) => {
        return axios.post(customersUrl, data).then((response)=>{
            if(response.status === 201){
                return response.data;
            }
            else{
                return {errors: response.error}
            }
        }).catch((e)=>{
            console.error(e);
            return {errors: e.message};
        })
      
}

export default axios.create({
    baseURL: baseUrl,
    headers: headers,
});
