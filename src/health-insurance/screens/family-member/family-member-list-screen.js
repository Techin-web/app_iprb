import { connect } from 'react-redux';
import { FamilyMemberComponent } from './family-member-component';
import { removeDependentInFamilyMembers, editDependentInFamilyMembers, removeDependentEditId } from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        ...state.OrderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeDependentInFamilyMembers: (index) => dispatch(removeDependentInFamilyMembers(index)),
        editDependentInFamilyMembers: (member, index) => dispatch(editDependentInFamilyMembers({member, index})),
        removeDependentEditId: () => dispatch(removeDependentEditId())
    };
};

const FamilyMemberListScreen = connect(mapStateToProps, mapDispatchToProps)(FamilyMemberComponent);
export { FamilyMemberListScreen };

