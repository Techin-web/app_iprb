import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../ActionTypes';

const defaultState = {
    loading: false,
    occupation: null,
    occupations: [],
    postalCodeAutoComplete: null,
    orderResult: null,
    order: {
        beneficiaries: [],
        holder: {},
        financialResponsible: {},
        dependent: {},
        familyMembers: [],
        states: [],
        statesWithId: [],
        cities: [],
        startedFill: false,
        documents: {}
    }
};

const OrderReducer = handleActions({
    [ACTION_TYPES.ORDER.RESET]: (state, action) => {
        return {...defaultState, order: {...defaultState.order, documents: {}}};
    },
    [ACTION_TYPES.ORDER.LOADING]: (state, action) => {
        return {...state, loading: action.payload};
    },
    [ACTION_TYPES.ORDER.SET_OCCUPATION]: (state, action) => {
        return {...state, occupation: action.payload};
    },
    [ACTION_TYPES.ORDER.SAVE_SUCCESS]: (state, action) => {
        const {holder, financialResponsible, members = []} = action.payload;
        const {order} = state;
        let familyMembers = [].concat(order.familyMembers);

        if(members.length){
            for(const {id, cpf} of members){
                let member = familyMembers.find(m => m.cpf === cpf);
                member.id = id;
            }
        }

        return {
            ...state,
            orderResult: action.payload,
            order: {
                ...order,
                holder: {...order.holder, id: holder.id},
                financialResponsible: {...order.financialResponsible, id: financialResponsible.id},
                familyMembers
            },
            loading: false
        };
    },
    [ACTION_TYPES.ORDER.SAVE_FINISH_SUCCESS]: (state, action) => {
        return {...state, orderResult: action.payload, loading: false};
    },
    [ACTION_TYPES.ORDER.UPDATE_DOCUMENT]: (state, action) => {
        const {typeForm, documentType, path} = action.payload;
        const order = {...state.order};
        const {documents = {}} = order;
        const cpf = order[typeForm].cpf;

        if(!documents[cpf]){
            documents[cpf] = {};
        }

        documents[cpf][documentType] = {
            documentType,
            path
        };

        order.documents = {...documents};

        return {...state, order}
    },
    [ACTION_TYPES.ORDER.UPDATE_ANSWER_DPS_FORM]: (state, action) => {
        const { typeForm, questionId, answer } = action.payload;
        const order = {...state.order};
        const {dpsAnswers = {}} = order[typeForm];

        dpsAnswers[questionId] = answer;
        order[typeForm].dpsAnswers = dpsAnswers;
        return {...state, order};
    },
    [ACTION_TYPES.ORDER.UPDATE_BENEFICIARY_DOCUMENTS]: (state, action) => {
        const { typeForm } = action.payload;
        const order = {...state.order};
        order[typeForm].documents = action.payload.documents;

        const {documents = {}} = order;
        const cpf = order[typeForm].cpf;

        for(const documentType in documents[cpf]){
            const doc = documents[cpf][documentType];
            documents[cpf][documentType] = {
                ...doc,
                upload: true
            };
        }

        order.documents = {...documents};

        return {...state, order, loading: false};
    },
    [ACTION_TYPES.ORDER.COMPLETE_BENEFICIARY_FORM]: (state, action) => {
        const order = {...state.order};
        const typeForm = action.payload;

        order[typeForm].complete = true;

        if(typeForm === 'financialResponsible' && order[typeForm].holder){
            order.holder.complete = true;
        }
        if(typeForm === 'financialResponsible') {
            order.financialResponsible.financialResponsible = true;
        }

        return {...state, order};
    },
    [ACTION_TYPES.ORDER.UPDATE_BENEFICIARY_FORM]: (state, action) => {
        const { beneficiary, typeForm } = action.payload;
        const order = {...state.order};
        order.startedFill = true;

        order[typeForm] = Object.assign({}, order[typeForm], beneficiary);

        if (typeForm === 'financialResponsible' && beneficiary.holder) {
            order.holder = beneficiary;
        }
        return {...state, order};
    },
    [ACTION_TYPES.ORDER.FETCH_STATE_SUCCESS]: (state, action) => {
        const statesWithId = action.payload.map(({label, id}) => {
            return {label, value: id}
        });
        return { ...state, states: action.payload, statesWithId, loading: false };
    },
    [ACTION_TYPES.ORDER.FETCH_CITY_SUCCESS]: (state, action) => {
        return { ...state, cities: action.payload, loading: false };
    },
    [ACTION_TYPES.ORDER.FETCH_POSTAL_CODE_SUCCESS]: (state, action) => {
        return {...state, postalCodeAutoComplete: action.payload, loading: false};
    },
    [ACTION_TYPES.ORDER.FETCH_OCCUPATION_SUCCESS]: (state, action) => {
        return {...state, occupations: action.payload, loading: false};
    },
    [ACTION_TYPES.ORDER.ADD_DEPENDENT_FAMILY_MEMBERS]: (state, action) => {
        let { order } = state;
        order.dependent.complete = true;
        if (typeof order.dependentEditId !== 'undefined') {
            order.familyMembers[order.dependentEditId] = order.dependent;
            order.dependentEditId = undefined;
            order.dependent = {};
        } else {
            order.familyMembers.push(order.dependent);
            order.dependent = {};
        }
        return { ...state, order: {...order, dependent: {}, familyMembers: [].concat(order.familyMembers)} };
    },
    [ACTION_TYPES.ORDER.REMOVE_DEPENDENT_FAMILY_MEMBERS]: (state, action) => {
        let { order } = state;
        const index = action.payload;
        order.familyMembers.splice(index, 1);
        return { ...state, order: {...order, familyMembers: [].concat(order.familyMembers)} };
    },
    [ACTION_TYPES.ORDER.EDIT_DEPENDENT_FAMILY_MEMBERS]: (state, action) => {
        let { order } = state;
        const { member, index } = action.payload;
        order.dependent = member;
        order.dependentEditId = index;
        return { ...state, order };
    }
    ,
    [ACTION_TYPES.ORDER.REMOVE_DEPENDENT_EDIT_ID_FAMILY_MEMBERS]: (state, action) => {
        let { order } = state;
        order.dependent = {};
        order.dependentEditId = undefined;
        return { ...state, order };
    }
}, defaultState);

export { OrderReducer };
