import React from 'react';
import { connect } from 'react-redux';
import { HealthInsuranceValueComponent } from './health-insurance-value-component';
import { fetchHealthInsuranceValues, handleChangeRadio } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        selected: state.HealthInsuranceReducer.healthInsuranceSelected,
        ...state.HealthInsuranceValuesReducer,
        ...state.ErrorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHealthInsuranceValues: (id) => dispatch(fetchHealthInsuranceValues(id)),
        handleChangeRadio: (withCoparticipation) => dispatch(handleChangeRadio(withCoparticipation))
    };
};

const  HealthInsuranceValueScreen  = connect(mapStateToProps, mapDispatchToProps)( HealthInsuranceValueComponent );
export { HealthInsuranceValueScreen };
