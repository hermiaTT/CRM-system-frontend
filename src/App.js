import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './view/Dashboard';
import Footer from './components/Footer';
import './App.css';
import NavPanel from './components/NavPanel';
import Customers from './view/Customers';
import Gallery from './view/Gallery';
import Employees from './view/Employees';
import Schedule from './view/Schedule';

function App() {
    return (
        <BrowserRouter>
            <NavPanel>
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/customers" exact element={<Customers />} />
                    <Route path="/services" exact element={<Gallery />} />
                    <Route path="/employees" exact element={<Employees />} />
                    <Route path="/employees/schedule" exact element={<Schedule />} />
                </Routes>
            </NavPanel>
        </BrowserRouter>
    );
}

export default App;
