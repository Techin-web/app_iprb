import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';


const defaultState = {
    accepted_terms: {}
};

const AcceptanceTermReducer = handleActions({
    [ACTION_TYPES.ACCEPTANCE_TERM.SET_GOTO]: (state, action) => {
        return {...state, goto: action.payload};
    },
    [ACTION_TYPES.ACCEPTANCE_TERM.FETCH_SUCCESS]: (state, {payload}) => {
        const { healthInsuranceId, accept } = payload.data;
        return {...state, accepted_terms: {...state.accepted_terms, [healthInsuranceId]: accept}};
    }
}, defaultState);

export { AcceptanceTermReducer };
