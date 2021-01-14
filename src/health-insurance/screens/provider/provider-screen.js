import React from 'react';
import { connect } from 'react-redux';
import { ProviderComponent } from './provider-component';
import { fetchProvider, setProviderDetail } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.ProviderReducer,
        healthInsuranceSelected: state.HealthInsuranceReducer.healthInsuranceSelected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProvider: (healthInsuranceId) => dispatch(fetchProvider(healthInsuranceId)),
        setProviderDetail: (provider) => dispatch(setProviderDetail(provider))
    };
};

const  ProviderScreen  = connect(mapStateToProps, mapDispatchToProps)( ProviderComponent );
export { ProviderScreen };
