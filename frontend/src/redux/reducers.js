const initialState = {
    users: [],
    questions: [],
    appraisalForms: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_USER':
        return { ...state, users: [...state.users, action.payload] };
      case 'SET_USERS':
        return { ...state, users: action.payload };
      case 'ADD_QUESTION':
        return { ...state, questions: [...state.questions, action.payload] };
      case 'SET_QUESTIONS':
        return { ...state, questions: action.payload };
      case 'ADD_APPRAISAL_FORM':
        return { ...state, appraisalForms: [...state.appraisalForms, action.payload] };
      default:
        return state;
    }
  };
  
  export default rootReducer;