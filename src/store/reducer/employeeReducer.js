// Initial state of employee
export const initialState = {
    employees: []
  };
  
  const employeesReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "GET_EMPLOYEES":
        return {
          ...state,
          employees: payload.data
        };
      default:
        return state;
    }
  };
  
  export default employeesReducer;
  