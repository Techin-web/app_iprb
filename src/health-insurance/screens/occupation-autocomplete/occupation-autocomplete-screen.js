import { connect } from 'react-redux';
import {OccupationAutocompleteComponent} from './occupation-autocomplete-component';
import {fetchOccupations, setOccupation} from '../../store/actions';

const mapStateToProps = (state) => {
    const {occupations, loading} = state.OrderReducer;

    return {
        ...state.ErrorReducer,
        occupations,
        loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOccupations: (name) => dispatch(fetchOccupations(name)),
        setOccupation: (name) => dispatch(setOccupation(name))
    };
};

const  OccupationAutocompleteScreen  = connect(mapStateToProps, mapDispatchToProps)( OccupationAutocompleteComponent );
export { OccupationAutocompleteScreen };
