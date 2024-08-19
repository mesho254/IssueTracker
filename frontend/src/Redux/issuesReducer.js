const initialState = {
    issues: [],
    loading: false,
  };
  
  export const issuesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ISSUES_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_ISSUES_SUCCESS':
        return { ...state, issues: action.payload, loading: false };
      case 'FETCH_ISSUES_FAILURE':
        return { ...state, loading: false };
      case 'ADD_ISSUE':
        return { ...state, issues: [...state.issues, action.payload] };
      case 'UPDATE_ISSUE':
        return {
          ...state,
          issues: state.issues.map(issue =>
            issue.id === action.payload.id ? action.payload : issue
          ),
        };
      case 'DELETE_ISSUE':
        return {
            ...state,
            issues: state.issues.filter(issue => issue.id !== action.payload),
        };
      default:
        return state;
    }
  };