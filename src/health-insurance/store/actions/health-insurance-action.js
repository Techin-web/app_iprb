import { createAction } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';
import { BaseService } from '../../services';
import {setError} from './error-action';

const HealthInsuranceService = new BaseService('/healthInsurance');

const toggleLoading = createAction(ACTION_TYPES.HEALTH_INSURANCE.LOADING);
const toggleLoadingValues = createAction(ACTION_TYPES.HEALTH_INSURANCE_VALUES.LOADING);
const fetchHealthInsuranceSuccess = createAction(ACTION_TYPES.HEALTH_INSURANCE.FETCH_SUCCESS);
const fetchHealthInsuranceValuesSuccess = createAction(ACTION_TYPES.HEALTH_INSURANCE_VALUES.FETCH_SUCCESS);

export const handleChangeRadio = createAction(ACTION_TYPES.HEALTH_INSURANCE_VALUES.CHANGE_RADIO_SUCCESS);
export const setHealthInsuranceSelected = createAction(ACTION_TYPES.HEALTH_INSURANCE.SET_SELECTED);

export const fetchHealthInsurance = () => {
    return async (dispatch, getState) => {
        dispatch(toggleLoading(true));
        try {
            const {data} = await HealthInsuranceService.list({filter: {where: {enable: 1}}});
            dispatch(fetchHealthInsuranceSuccess(data));
        } catch (error) {
            dispatch(toggleLoading(false));
            dispatch(setError(error));
        }
    };
};

export const fetchHealthInsuranceValues = (id) => {
    return async (dispatch) => {
        dispatch(toggleLoadingValues(true));

        try {
            const {data} = await HealthInsuranceService.get(id, {}, '/values');
            dispatch(fetchHealthInsuranceValuesSuccess(data));
        } catch (error) {
            dispatch(toggleLoadingValues(false));
            dispatch(setError(error));
        }
    };
};
