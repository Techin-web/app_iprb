import { createAction } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';
import { BaseService } from '../../services';
import { setError } from './error-action';

const HealthInsuranceService = new BaseService('/healthInsurance');

const toggleLoading = createAction(ACTION_TYPES.PROVIDER.LOADING);
const fetchProviderSuccess = createAction(ACTION_TYPES.PROVIDER.FETCH_SUCCESS);
const setProviderDetailSuccess = createAction(ACTION_TYPES.PROVIDER.SET_DETAIL_SUCCESS);

export const fetchProvider = (healthInsuranceId) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true));
        try {
            const {data} = await HealthInsuranceService.get(healthInsuranceId, null, '/providers');
            dispatch(fetchProviderSuccess(data));
        } catch (error) {
            dispatch(toggleLoading(false));
            dispatch(setError(error));
        }
    };
};

export const setProviderDetail = (provider) => {
    return async (dispatch) => {
        try {
            dispatch(setProviderDetailSuccess(provider));
        } catch (error) {
            console.error('setProviderDetail: ', error);
        }
    };
}
