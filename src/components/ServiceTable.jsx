import React, { useEffect, useMemo, useState } from 'react';
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
import { Divider, Toolbar, TableSortLabel, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

// Utility functions for sorting
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

// EnhancedTableHead component
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {columns.map((column) => (
                    
                    <TableCell
                        key={column.id}
                        align="left"
                        padding="normal"
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={{ visuallyHidden: 'visuallyHidden' }}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
};

// EnhancedTableToolbar component
const EnhancedTableToolbar = (props) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
        >
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                {props.header}
            </Typography>
        </Toolbar>
    );
};

// Row component
const Row = (props) => {
    const { row, columns, onEdit, onDelete } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow
                className="table-row-actions"
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {columns.map((col) => (
                    col.id !== 'serviceImg' && (
                        <TableCell key={col.id} align={col.align || 'left'}>
                            {row[col.id]}
                        </TableCell>
                    )
                ))}
                <TableCell align="left">
                    <Stack className="table-actions-cell" spacing={2} direction="row">
                        <EditIcon
                        style={{ fontSize: '20px', cursor: 'pointer' }}
                        className="cursor-pointer"
                        onClick={() => onEdit(row)}
                        />
                        <DeleteIcon
                        style={{ fontSize: '20px', cursor: 'pointer' }}
                        className="cursor-pointer"
                        onClick={() => onDelete(row.id)}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            {row.serviceImg &&

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Service Images
                                </Typography>
                                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
                                    {row.serviceImg.map((imgSrc, index) => (
                                        <img key={index} src={imgSrc} alt={`service-${index}`} width={100} />
                                    ))}
                                </Box>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        serviceImg: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// ServiceTable component
const ServiceTable = ({ columns, rows, onEdit, onDelete }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [filterValue, setFilterValue] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterChange = (event, value) => {
        setFilterValue(value);
        if (!value) {
            setFilteredRows(rows);
        } else {
            const newFilteredRows = rows.filter((row) =>
                row.fullName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredRows(newFilteredRows);
        }
    };

    const visibleRows = useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)),
        [order, orderBy, filteredRows],
    );

    return (
        <TableContainer component={Paper}>
            <EnhancedTableToolbar header='Services List' />
            <Divider />
            <Table aria-label="collapsible table">
                <EnhancedTableHead
                    columns={columns}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {visibleRows.map((row) => (
                        <Row key={row.id} row={row} columns={columns} onEdit ={onEdit} onDelete ={onDelete} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ServiceTable;
