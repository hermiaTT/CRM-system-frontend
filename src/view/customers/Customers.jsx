import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useCustomers from '../../store/context/CustomersContext';
import { customerKeys } from '../../data/data-header-info';


const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false); 
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {Object.keys(row).map((key) => (
            key !== "Past Services" && <TableCell key={key}>{row[key]}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(row).length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Past Services
                </Typography>
                {row["Past Services"].length > 0 ? (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        {Object.keys(row["Past Services"][0]).map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row["Past Services"].map((service, index) => (
                        <TableRow key={index}>
                          {Object.keys(service).map((key) => (
                            <TableCell key={key}>{service[key]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No Past Services</Typography>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

Row.propTypes = {
  row: PropTypes.isRequired
};


 const Customers = ()=> {
  const {customers, loading, error, getAllCustomers} = useCustomers();

  useEffect(()=>{
    getAllCustomers();
  },[])

  console.log(customers);


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(customerKeys).map((key) => (
              key !== "Past Services" && <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {customers && customers.map((row, index) => (
             row&& <Row key={index} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default  Customers;
