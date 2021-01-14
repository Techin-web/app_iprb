import { combineReducers } from 'redux';
import { HealthInsuranceReducer, HealthInsuranceValuesReducer } from './health-insurance-reducer';
import { ProviderReducer } from './provider-reducer';
import { AcceptanceTermReducer } from './acceptance-term-reducer';
import { DPSFormReducer } from './dps-form-reducer';
import { OrderReducer } from './order-reducer';
import {ErrorReducer} from './error-reducer';


const rootReducer = combineReducers({
    HealthInsuranceReducer,
    HealthInsuranceValuesReducer,
    ProviderReducer,
    DPSFormReducer,
    OrderReducer,
    AcceptanceTermReducer,
    ErrorReducer
});

export default rootReducer;
