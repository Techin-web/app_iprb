import { createAction } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';
import { BaseService } from '../../services';

const DPSFormService = new BaseService('/DpsFormQuestion');

const fetchDPSFormQuestionSuccess = createAction(ACTION_TYPES.DPS_FORM.FETCH_SUCCESS);

export const fetchDPSFormQuestion = () => {
    return async (dispatch, getState) => {
        try {
            //TODO: search what to do here, update store to original state after one day ....
            if(!getState().DPSFormReducer.hasQuestions){
                const {data} = await DPSFormService.list();
                dispatch(fetchDPSFormQuestionSuccess(data));
            }
        } catch (error) {
            console.error('fetchDpsFormQuestions: ', error);
        }
    };
};
