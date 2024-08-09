export const customersTableColumn = [
    { id: "id", label: "Id", numeric: true, disablePadding: true },
    { id: "fullName", label: "Customer Name", numeric: false, disablePadding: false },
    { id: "phoneNumber", label: "Phone Number", numeric: false, disablePadding: false },
    { id: "vipType", label: "VIP Type", numeric: false, disablePadding: false },
    { id: "balance", label: "Balance", numeric: true, disablePadding: false },
    { id: "firstLanguage", label: "First Language", numeric: false, disablePadding: false },
    { id: "comingResource", label: "Visit Resource", numeric: false, disablePadding: false },
    { id: "birthday", label: "Birth Day", numeric: false, disablePadding: false,
        renderCell: (params) => {
            const date = new Date(params.value);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
        }
    },
    { id: "note", label: "note", numeric: false, disablePadding: false },
];

export const employeesTableColumn = [
        { id: "id", label: "Id", numeric: true, disablePadding: false },
        { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
        { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
        // { id: "fullName", label: "Employee Name", numeric: false, disablePadding: false },
        { id: "phoneNumber", label: "Phone Number", numeric: false, disablePadding: false },
        { id: "sin", label: "sin", numeric: false, disablePadding: false },
] 

export const servicesTableColumn = [
    {id: "serviceDate", label: "日期",
        renderCell: (params) => {
            const date = new Date(params.value);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
        }
    },
    {id: "customerName", label: "客户姓名"},
    {id: "serviceType", label: "项目"},
    {id: "totalPaid", label: "总收费"},
    {id: "servicePrice", label: "款式价格"},
    {id: "tips", label: "小费"},
    {id: "employeeName", label: "员工"},
]