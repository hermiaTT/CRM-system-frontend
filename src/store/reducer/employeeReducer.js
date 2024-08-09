// Initial state of employee
export const initialState = {
    employees: [],
    loading: false,
    errors: null,
  };
  
  const employeeReducer = (state, action) => {
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
  
  export default employeeReducer;
  