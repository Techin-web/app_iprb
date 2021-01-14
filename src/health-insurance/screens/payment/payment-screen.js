import React from "react";
import { connect } from "react-redux";
import { PaymentComponent } from "./payment-component";
import {
    fetchAddressByPostalCode,
    saveFinishOrder,
    checkSmsToken,
    resetOrder,
    saveOrder,
} from "../../store/actions";

const mapStateToProps = (state) => {
    return {
        ...state.OrderReducer,
        ...state.ErrorReducer,
        healthInsurance: state.HealthInsuranceReducer.healthInsuranceSelected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddressByPostalCode: (postalCode) =>
            dispatch(fetchAddressByPostalCode(postalCode)),
        saveFinishOrder: (order) => dispatch(saveFinishOrder(order)),
        checkSmsToken: (id, token) => dispatch(checkSmsToken(id, token)),
        resetOrder: () => dispatch(resetOrder()),
        saveOrder: (order) => dispatch(saveOrder(order)),
    };
};

const PaymentScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentComponent);
export { PaymentScreen };
