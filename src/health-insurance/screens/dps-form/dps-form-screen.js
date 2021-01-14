import { connect } from 'react-redux';
import { DPSFormComponent } from './dps-form-component';
import { fetchDPSFormQuestion, updateAnswerDPSForm, addDependentInFamilyMembers, completeBeneficiaryForm, updateHolder } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.DPSFormReducer,
        ...state.OrderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDPSFormQuestion: () => dispatch(fetchDPSFormQuestion()),
        updateAnswerDPSForm: (typeForm, questionId, answer) =>
            dispatch(updateAnswerDPSForm({typeForm, questionId, answer})),
        addDependentInFamilyMembers: () => dispatch(addDependentInFamilyMembers()),
        completeBeneficiaryForm: (typeForm) => dispatch(completeBeneficiaryForm(typeForm)),
        updateHolder: (beneficiary, typeForm) => dispatch(updateHolder({beneficiary, typeForm}))
    };
};

const DPSFormScreen = connect(mapStateToProps, mapDispatchToProps)(DPSFormComponent);
export { DPSFormScreen };
