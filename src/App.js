import './App.css';
import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';

function App(){
    const[customers, setCustomers] = useState();

    const getCustomers = async()=>{
        try{
            const response = await api.get("/api/v1/customers");
            console.log(response.data);
            setCustomers(response.data);

        }catch(e){
            console.error(e);
        }
    }
    useEffect(()=>{
        getCustomers();
    },[])
    return(
        <div>hedddllo</div>
    );
}

export default App;
