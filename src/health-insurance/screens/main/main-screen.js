import React from 'react';
import { connect } from 'react-redux';
import { MainScreenComponent } from './main-component';
import { login } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.ErrorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(login())
    };
};

const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenComponent);
export { MainScreen };
