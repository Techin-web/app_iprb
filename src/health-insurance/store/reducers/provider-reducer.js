import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';

const defaultState = {
    providers: [],
    provider: {},
    loading: false
};

const ProviderReducer = handleActions({
    [ACTION_TYPES.PROVIDER.LOADING]: (state, action) => {
        return {...state, loading: action.payload};
    },
    [ACTION_TYPES.PROVIDER.FETCH_SUCCESS]: (state, action) => {
        return {...state, providers: action.payload, loading: false};
    },
    [ACTION_TYPES.PROVIDER.SET_DETAIL_SUCCESS]: (state, action) => {
        return {...state, provider: action.payload};
    }
}, defaultState);

export { ProviderReducer };
