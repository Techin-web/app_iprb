
import { connect } from 'react-redux';
import { SuccessComponent } from './success-component';
import { resetOrder } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.OrderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrder: () => dispatch(resetOrder())
    };
};

const SuccessScreen = connect(mapStateToProps, mapDispatchToProps)(SuccessComponent);
export { SuccessScreen };
