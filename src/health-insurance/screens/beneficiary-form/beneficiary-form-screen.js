import React from 'react';
import { connect } from 'react-redux';
import { BeneficiaryFormScreenComponent } from './beneficiary-form-component';
import {
    updateHolder,
    fetchState,
    fetchCity,
    fetchAddressByPostalCode,
    setOccupation,
    setAutocompleteResult,
    completeBeneficiaryForm,
    updateDocumentBeneficiaryForm,
    uploadDocuments
 } from '../../store/actions';


const mapStateToProps = (state) => {
    return {
        ...state.OrderReducer,
        ...state.ErrorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHolder: (beneficiary, typeForm) => dispatch(updateHolder({beneficiary, typeForm})),
        fetchState: () => dispatch(fetchState()),
        fetchCity: () => dispatch(fetchCity()),
        fetchAddressByPostalCode: (postalCode) => dispatch(fetchAddressByPostalCode(postalCode)),
        completeBeneficiaryForm: (typeForm) => dispatch(completeBeneficiaryForm(typeForm)),
        updateDocumentBeneficiaryForm: (typeForm, documentType, path) => dispatch(updateDocumentBeneficiaryForm({typeForm, documentType, path})),
        resetAutocompleteFields: () => {
            dispatch(setOccupation(''));
            dispatch(setAutocompleteResult(null));
        },
        uploadDocuments: (typeForm, documents) => dispatch(uploadDocuments(typeForm, documents))
    };
};

const BeneficiaryFormScreen = connect(mapStateToProps, mapDispatchToProps)(BeneficiaryFormScreenComponent);
export { BeneficiaryFormScreen };
