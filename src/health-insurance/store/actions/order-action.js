import FormData from "form-data";
import { Platform } from "react-native";
import { createAction } from "redux-actions";
import { ACTION_TYPES } from "../ActionTypes";
import { setError } from "./error-action";
import { BaseService } from "../../services";

// main-app axios API
import main_app_api from "../../../main-app/services/axios-instance";
import * as main_app_healthInsuranceId from "../../../main-app/config/institution-metadata";

const StateService = new BaseService("/State");
const OrderService = new BaseService("/HealthInsuranceOrder");
const CityService = new BaseService("/City");
const PostalCodeService = new BaseService("/postalCode/search");
const OccupationService = new BaseService("/Occupation/search");
const BeneficiaryService = new BaseService("/Beneficiary");

const toggleLoading = createAction(ACTION_TYPES.ORDER.LOADING);
const fetchStateSuccess = createAction(ACTION_TYPES.ORDER.FETCH_STATE_SUCCESS);
const fetchCitySuccess = createAction(ACTION_TYPES.ORDER.FETCH_CITY_SUCCESS);
const fetchAddressByPostalCodeSuccess = createAction(
    ACTION_TYPES.ORDER.FETCH_POSTAL_CODE_SUCCESS
);
const saveOrderSuccess = createAction(ACTION_TYPES.ORDER.SAVE_SUCCESS);
const saveFinishOrderSuccess = createAction(
    ACTION_TYPES.ORDER.SAVE_FINISH_SUCCESS
);
const fetchOccupationSuccess = createAction(
    ACTION_TYPES.ORDER.FETCH_OCCUPATION_SUCCESS
);
const updateBeneficiaryDocuments = createAction(
    ACTION_TYPES.ORDER.UPDATE_BENEFICIARY_DOCUMENTS
);

export const updateAnswerDPSForm = createAction(
    ACTION_TYPES.ORDER.UPDATE_ANSWER_DPS_FORM
);
export const addDependentInFamilyMembers = createAction(
    ACTION_TYPES.ORDER.ADD_DEPENDENT_FAMILY_MEMBERS
);
export const removeDependentInFamilyMembers = createAction(
    ACTION_TYPES.ORDER.REMOVE_DEPENDENT_FAMILY_MEMBERS
);
export const editDependentInFamilyMembers = createAction(
    ACTION_TYPES.ORDER.EDIT_DEPENDENT_FAMILY_MEMBERS
);
export const removeDependentEditId = createAction(
    ACTION_TYPES.ORDER.REMOVE_DEPENDENT_EDIT_ID_FAMILY_MEMBERS
);
export const updateHolder = createAction(
    ACTION_TYPES.ORDER.UPDATE_BENEFICIARY_FORM
);
export const resetOrder = createAction(ACTION_TYPES.ORDER.RESET);
export const setOccupation = createAction(ACTION_TYPES.ORDER.SET_OCCUPATION);
export const setAutocompleteResult = createAction(
    ACTION_TYPES.ORDER.FETCH_POSTAL_CODE_SUCCESS
);
export const completeBeneficiaryForm = createAction(
    ACTION_TYPES.ORDER.COMPLETE_BENEFICIARY_FORM
);
export const updateDocumentBeneficiaryForm = createAction(
    ACTION_TYPES.ORDER.UPDATE_DOCUMENT
);

export const fetchState = () => {
    return async (dispatch, getState) => {
        // if(getState().OrderReducer.states && getState().OrderReducer.states.length > 0){
        //     return;
        // }

        try {
            const { data } = await StateService.list();
            let modelDataOptions = data.map((e) => ({
                label: e.abbreviation,
                value: e.abbreviation,
                id: e.id,
                name: e.name,
            }));
            modelDataOptions.sort((a, b) =>
                String(a.label).localeCompare(String(b.label))
            );
            modelDataOptions.unshift({ label: "Selecionar", value: "" });
            dispatch(fetchStateSuccess(modelDataOptions));
        } catch (error) {
            dispatch(setError(error));
        }
    };
};

export const fetchCity = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await CityService.list();
            let modelDataOptions = data.map((e) => ({
                label: e.name,
                value: e.name,
                stateId: e.stateId,
            }));
            modelDataOptions.sort((a, b) =>
                String(a.label).localeCompare(String(b.label))
            );
            modelDataOptions.unshift({ label: "Selecionar", value: "" });
            dispatch(fetchCitySuccess(modelDataOptions));
        } catch (error) {
            dispatch(setError(error));
        }
    };
};

export const fetchAddressByPostalCode = (postalCode) => {
    return async (dispatch) => {
        try {
            const { data } = await PostalCodeService.get(postalCode);
            dispatch(fetchAddressByPostalCodeSuccess(data));

            const autocompleteClearTimeout = setTimeout(() => {
                dispatch(fetchAddressByPostalCodeSuccess(null));
                clearTimeout(autocompleteClearTimeout);
            }, 1200);
        } catch (error) {
            dispatch(setError(error));
        }
    };
};

export const fetchOccupations = (name) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true));
        try {
            const { data } = await OccupationService.list({ name });
            dispatch(fetchOccupationSuccess(data));
        } catch (error) {
            dispatch(setError(error));
            dispatch(toggleLoading(false));
        }
    };
};

export const saveOrder = (order) => {
    return async (dispatch, getState) => {
        dispatch(toggleLoading(true));
        const { orderResult } = getState().OrderReducer;
        const update = orderResult && orderResult.id;

        try {
            const mainAppResponse = await main_app_api.get("/users");

            const appUserId = mainAppResponse.data.id;

            if (!appUserId) {
                throw new Error("Falha ao buscar dados do usuário vendedor.");
            }

            order.app_user_id = appUserId;
            order.app_user_email = mainAppResponse.data.email;
            order.app_product_id =
                main_app_healthInsuranceId.HEALTH_INSURANCE_ID;

            let finalData = order;
            if (update) {
                finalData = { ...order, id: orderResult.id };
            }

            const { data } = await OrderService.post("/createOrder", finalData);
            dispatch(saveOrderSuccess(data));
            return data;
        } catch (e) {
            dispatch(setError(e));
            dispatch(toggleLoading(false));
        }

        return null;
    };
};

export const checkSmsToken = (id, token) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true));

        try {
            const { data } = await BeneficiaryService.get(
                id,
                null,
                `/checkSmsToken/${token}`
            );
            dispatch(toggleLoading(false));
            return data;
        } catch (e) {
            dispatch(setError(e));
            dispatch(toggleLoading(false));
        }

        return null;
    };
};

export const saveFinishOrder = (order) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true));
        try {
            const { data } = await OrderService.post("/finishOrder", order);

            dispatch(saveFinishOrderSuccess(data));
            return data;
        } catch (e) {
            dispatch(setError(e));
            dispatch(toggleLoading(false));
        }

        return null;
    };
};

export const uploadDocuments = (typeForm, documents) => {
    return async (dispatch) => {
        try {
            const formData = createFormData(Object.values(documents));
            const { data } = await createUploadRequest(formData);
            dispatch(updateBeneficiaryDocuments({ typeForm, documents: data }));
            return true;
        } catch (e) {
            return false;
        }
    };
};

export const postalCodeIsValid = async (postalCode) => {
    try {
        await PostalCodeService.get(postalCode);
        return true;
    } catch (e) {
        return false;
    }
};

const createUploadRequest = (formData) => {
    return BeneficiaryService.upload(`/uploadDocuments`, formData);
};

const createFormData = (files) => {
    const data = new FormData();

    files
        .filter(({ upload }) => !upload)
        .map(({ documentType, path }) => {
            const filename = path.substring(path.lastIndexOf("/") + 1);
            data.append(documentType, {
                name: filename,
                type: "image/jpeg",
                uri:
                    Platform.OS === "android"
                        ? path
                        : path.replace("file://", ""),
            });
        });

    return data;
};
