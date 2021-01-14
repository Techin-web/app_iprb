import React from 'react';
import { connect } from 'react-redux';
import { HealthInsuranceDetailComponent } from './health-insurance-detail-component';
import { resetOrder } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        order: state.OrderReducer.order,
        ...state.HealthInsuranceReducer,
        ...state.ErrorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrder: () => dispatch(resetOrder())
    };
};

const HealthInsuranceDetailScreen = connect(mapStateToProps, mapDispatchToProps)(HealthInsuranceDetailComponent);
export { HealthInsuranceDetailScreen };
