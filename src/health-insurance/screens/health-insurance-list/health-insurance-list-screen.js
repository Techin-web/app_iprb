import React from 'react';
import { connect } from 'react-redux';
import { HealthInsuranceListComponent } from './health-insurance-list-component';
import {
    fetchHealthInsurance,
    fetchAcceptanceTerm,
    setHealthInsuranceSelected,
    setAcceptanceTermGoto,
    login
 } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.HealthInsuranceReducer,
        ...state.AcceptanceTermReducer,
        ...state.ErrorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(login()),
        removeAcceptanceTermGoto: () => dispatch(setAcceptanceTermGoto(false)),
        fetchHealthInsurance: () => dispatch(fetchHealthInsurance()),
        fetchAcceptanceTerm: (id) => dispatch(fetchAcceptanceTerm(id)),
        setHealthInsuranceSelected: (healthInsuranceSelected) => dispatch(setHealthInsuranceSelected(healthInsuranceSelected))
    };
};

const HealthInsuranceListScreen = connect(mapStateToProps, mapDispatchToProps)(HealthInsuranceListComponent);
export { HealthInsuranceListScreen };
