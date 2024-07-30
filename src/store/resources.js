import { Collections, EventNote, Face3, PeopleAlt, SpaceDashboard } from "@mui/icons-material";
import React from 'react';
export const resources ={
    navbarHeaderUpper: [
        {
            value: 'Dashboard',
            icon: <SpaceDashboard/>,
            href: '/'
        },
        {
            value: 'Customer List',
            icon: <PeopleAlt/>,
            href: '/customers'
        },
        {
            value: 'Gallery',
            icon: <Collections/>,
            href: '/services'
        }
    ],
    navbarHeaderBottom: [
        {
            value: 'Employee List',
            icon: <Face3/>,
            href: '/employees'
        },
        {
            value: 'Schedule',
            icon: <EventNote/>,
            href: '/employees/schedule'
        },

    ]

    
}