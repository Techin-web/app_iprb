import React from 'react';
import { connect } from 'react-redux';
import { AcceptanceTermComponent } from './acceptance-term-component';
import { setAcceptanceTerm } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.HealthInsuranceReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAcceptanceTerm: (id) => dispatch(setAcceptanceTerm(id))
    };
};

const AcceptanceTermScreen = connect(mapStateToProps, mapDispatchToProps)(AcceptanceTermComponent);
export { AcceptanceTermScreen };
