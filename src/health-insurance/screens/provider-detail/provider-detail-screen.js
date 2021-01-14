import React from 'react';
import { connect } from 'react-redux';
import { ProviderDetailComponent } from './provider-detail-component';

const mapStateToProps = (state) => {
    const { provider } = state.ProviderReducer;
    return {
        provider
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ProviderDetailScreen = connect(mapStateToProps, mapDispatchToProps)(ProviderDetailComponent);
export { ProviderDetailScreen };
