
const defaultState = {
    error: null
};

const ErrorReducer = (_, action) => {

    if(action.error){
        return {error: action.error};
    }

    return defaultState;
};

export { ErrorReducer };
