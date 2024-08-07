import { Collections, EventNote, Face3, FilterVintage, PeopleAlt, SpaceDashboard } from "@mui/icons-material";
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
            value: 'Services',
            icon: <FilterVintage/>,
            href: '/services'
        },
        {
            value: 'Gallery',
            icon: <Collections/>,
            href: '/gallery'
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

    ],
    vipType: ["group purchase", "VIP 1000", "VIP 3000", "VIP 5000"],
    firstLanguage: ["English", "Madrian", "Catonese"],
    comingResource: ["小红书", "朋友推荐", "电话", "Walk In", "Other"]

    
}