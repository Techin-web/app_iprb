import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';

const defaultState = {
    hasQuestions: false,
    totalQuestions: 0,
    questions: {
        step1: [],
        step2: []
    }
};

const DPSFormReducer = handleActions({
    [ACTION_TYPES.DPS_FORM.FETCH_SUCCESS]: (state, action) => {
        const totalQuestions = action.payload.length;
        const step1 = action.payload.splice(0, Math.ceil(action.payload.length / 2));
        return {...state, totalQuestions, hasQuestions: true, questions: {step1, step2: action.payload}};
    }
}, defaultState);

export { DPSFormReducer };
