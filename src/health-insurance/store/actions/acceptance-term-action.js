import { createAction } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';
import { BaseService } from '../../services';

const AcceptanceTermService = new BaseService('/AcceptanceTerm');

const fetchAcceptanceTermSuccess = createAction(ACTION_TYPES.ACCEPTANCE_TERM.FETCH_SUCCESS);

export const setAcceptanceTermGoto = createAction(ACTION_TYPES.ACCEPTANCE_TERM.SET_GOTO);

export const fetchAcceptanceTerm = (id) => {
    return async (dispatch, getState) => {

        if(getState().AcceptanceTermReducer.accepted_terms[id]){
            return getState().AcceptanceTermReducer.accepted_terms[id];
        }

        try {
            const {data} = await AcceptanceTermService.get(`${id}/isAccepted`, {});
            dispatch(fetchAcceptanceTermSuccess({data}));
            return data.accept;
        } catch (error) {
            console.error('fetchAcceptanceTerm: ', error);
        }

        return null;
    };
};

export const setAcceptanceTerm = (id) => {
    return async (dispatch) => {
        try {
            await AcceptanceTermService.post(`/${id}/acceptTerm`, null);
            dispatch(setAcceptanceTermGoto(true));
        } catch (error) {
            console.error('setAcceptanceTerm: ', error);
        };
    };
};
