import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { resources } from '../store/resources';
import Header from './Header';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  

const NavPanel = ({ children }) => {
  const theme = useTheme();
  const [currentPageHeader, setCurrentPageHeader] = useState("Dashboard")
  const [open, setOpen] = useState(true);
  const topNavHeader = resources.navbarHeaderUpper;
  const bottomNavHeader = resources.navbarHeaderBottom;
  const onSectionSelected = (data)=>{
    setCurrentPageHeader(data.value);
  }
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Header onClick={() => setOpen(!open)} open = {open}/>
      <Drawer 
        variant="permanent"
        anchor="left"
        open={open}
      >
        <DrawerHeader/>
        <List>
          {topNavHeader.map((data, index) => (
            <ListItem  className="link-body-emphasis link-underline-opacity-0" key={data.value + index}  sx={{ display: 'block' }} disablePadding component={Link} to={data.href}>
              <ListItemButton 
                 sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                onClick={()=>onSectionSelected(data)}
                >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.value} sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {bottomNavHeader.map((data, index) => (
                 <ListItem  className="link-body-emphasis link-underline-opacity-0" key={data.value + index}  sx={{ display: 'block' }} disablePadding component={Link} to={data.href}>
                 <ListItemButton 
                    sx={{
                       minHeight: 48,
                       justifyContent: open ? 'initial' : 'center',
                       px: 2.5,
                     }}
                   onClick={()=>onSectionSelected(data)}
                   >
                   <ListItemIcon
                      sx={{
                       minWidth: 0,
                       mr: open ? 3 : 'auto',
                       justifyContent: 'center',
                     }}>
                     {data.icon}
                   </ListItemIcon>
                   <ListItemText primary={data.value} sx={{ opacity: open ? 1 : 0 }}/>
                 </ListItemButton>
               </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#e3d2b78a' }}>
        <DrawerHeader /> 
        {children}
      </Box>
      
    </Box>
  );
}
export default NavPanel;
