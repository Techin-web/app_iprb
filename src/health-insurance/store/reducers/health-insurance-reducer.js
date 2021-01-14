import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';
import { ACTION_TYPES } from '../ActionTypes';


const defaultState = {
    loading: false,
    healthInsurances: [],
    planDetail: {},
    planValues: [],
    healthInsuranceSelected: {}
};

const HealthInsuranceReducer = handleActions({
    [REHYDRATE]: () => {
        return {...defaultState};
    },
    [ACTION_TYPES.HEALTH_INSURANCE.FETCH_SUCCESS]: (state, action) => {
        return { ...state, healthInsurances: action.payload, loading: false };
    },
    [ACTION_TYPES.HEALTH_INSURANCE.SET_SELECTED]: (state, action) => {
        return { ...state, healthInsuranceSelected: action.payload };
    },
    [ACTION_TYPES.HEALTH_INSURANCE.LOADING]: (state, action) => {
        return {...state, loading: action.payload};
    }
}, defaultState);

const HealthInsuranceValuesReducer = handleActions({
    [ACTION_TYPES.HEALTH_INSURANCE_VALUES.LOADING]: (state, action) => {
        return {...state, loading: action.payload};
    },
    [ACTION_TYPES.HEALTH_INSURANCE_VALUES.FETCH_SUCCESS]: (state, action) => {
        const planDetail = action.payload;
        const planValues = planDetail.withCoparticipation || [];
        return {...state, planDetail, planValues, loading: false};
    },
    [ACTION_TYPES.HEALTH_INSURANCE_VALUES.CHANGE_RADIO_SUCCESS]: (state, action) => {
        const withCoparticipation = action.payload;
        const { planDetail } = state;
        const planValues =
            withCoparticipation
                ? planDetail.withCoparticipation
                : planDetail.withoutCoparticipation;
        return {...state, planValues, withCoparticipation};
    }
}, defaultState);

export { HealthInsuranceReducer, HealthInsuranceValuesReducer };
