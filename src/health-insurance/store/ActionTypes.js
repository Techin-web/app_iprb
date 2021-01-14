export const ACTION_TYPES = {
    DPS_FORM: {
        FETCH_SUCCESS: 'FETCH_DPS_FORM_QUESTION_SUCCESS'
    },
    HEALTH_INSURANCE: {
        LOADING: 'TOGGLE_LOADING_HEALTH_INSURANCE',
        FETCH_SUCCESS: 'FETCH_HEALTH_INSURANCE_SUCCESS',
        SET_SELECTED: 'SET_SELECTED_HEALTH_INSURANCE'
    },
    HEALTH_INSURANCE_VALUES: {
        LOADING: 'TOGGLE_LOADING_HEALTH_INSURANCE_VALUES',
        FETCH_SUCCESS: 'FETCH_HEALTH_INSURANCE_VALUES_SUCCESS',
        CHANGE_RADIO_SUCCESS: 'CHANGE_RADIO_HEALTH_INSURANCE_VALUE_SUCCESS'
    },
    PROVIDER : {
        LOADING: 'PROVIDER_LOADING',
        FETCH_SUCCESS: 'FETCH_PROVIDER_SUCCESS',
        SET_DETAIL_SUCCESS: 'SET_PROVIDER_DETAIL_SUCCESS'
    },
    ORDER: {
        SAVE_SUCCESS: 'SAVE_ORDER_SUCCESS',
        SAVE_FINISH_SUCCESS: 'SAVE_FINISH_ORDER_SUCCESS',
        LOADING: 'TOGGLE_LOADING_ORDER',
        UPDATE_ANSWER_DPS_FORM: 'UPDATE_ORDER_ANSWER_DPS_FORM',
        UPDATE_BENEFICIARY_FORM: 'UPDATE_OERDER_HOLDER_FORM',
        FETCH_STATE_SUCCESS: 'FETCH_ORDER_STATE_SUCCESS',
        FETCH_CITY_SUCCESS: 'FETCH_ORDER_CITY_SUCCESS',
        FETCH_POSTAL_CODE_SUCCESS: 'FETCH_ORDER_POSTAL_CODE_SUCCESS',
        ADD_DEPENDENT_FAMILY_MEMBERS: 'ORDER_ADD_DEPENDENT_FAMILY_MEMBERS',
        REMOVE_DEPENDENT_FAMILY_MEMBERS: 'ORDER_REMOVE_DEPENDENT_FAMILY_MEMBERS',
        EDIT_DEPENDENT_FAMILY_MEMBERS: 'ORDER_EDIT_DEPENDENT_FAMILY_MEMBERS',
        REMOVE_DEPENDENT_EDIT_ID_FAMILY_MEMBERS: 'ORDER_REMOVE_DEPENDENT_EDIT_ID_FAMILY_MEMBERS',
        RESET: 'ORDER_RESET',
        FETCH_OCCUPATION_SUCCESS: 'FETCH_ORDER_OCCUPATIONS',
        SET_OCCUPATION: 'ORDER_SET_OCCUPATION',
        COMPLETE_BENEFICIARY_FORM: 'COMPLETE_BENEFICIARY_FORM',
        UPDATE_DOCUMENT: 'UPDATE_DOCUMENT_BENEFICIARY_FORM',
        UPDATE_BENEFICIARY_DOCUMENTS: 'UPDATE_UPDATE_BENEFICIARY_FORM_DOCUMENTS'
    },
    ACCEPTANCE_TERM: {
        FETCH_SUCCESS: 'FETCH_ACCEPTANCE_TERM_SUCCESS',
        SET_GOTO: 'SET_ACCEPTANCE_TERM_GOTO'
    }
};