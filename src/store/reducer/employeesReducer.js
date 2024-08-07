// Initial state of employee
export const initialState = {
    employees: [],
    loading: false,
    error: null,
    tableColumn: [
        { id: "id", label: "Id", numeric: true, disablePadding: false },
        { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
        { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
        // { id: "fullName", label: "Employee Name", numeric: false, disablePadding: false },
        { id: "phoneNumber", label: "Phone Number", numeric: false, disablePadding: false },
        { id: "sin", label: "sin", numeric: false, disablePadding: false },
    ]
  };
  
  const employeesReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
        case "GET_EMPLOYEES_SUCCESS":
            console.log("GET_EMPLOYEES_SUCCESS", payload);
            return {
                ...state,
                loading: false,
                employees: payload
            };
        case "GET_EMPLOYEES_FAILURE":
            console.log("GET_EMPLOYEES_FAILURE", payload);
            return {
            ...state,
            loading: false,
            error: payload
            };
        default:
            return state;
    }
  };
  
  export default employeesReducer;
  