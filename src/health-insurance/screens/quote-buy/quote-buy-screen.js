import { connect } from 'react-redux';
import { QuoteBuyComponent } from './quote-buy-component';
import { saveOrder, resetOrder } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.OrderReducer,
        ...state.ErrorReducer,
        healthInsurance: state.HealthInsuranceReducer.healthInsuranceSelected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrder: () => dispatch(resetOrder()),
        saveOrder: (order) => dispatch(saveOrder(order))
    };
};

const  QuoteBuyScreen  = connect(mapStateToProps, mapDispatchToProps)( QuoteBuyComponent );
export { QuoteBuyScreen };
