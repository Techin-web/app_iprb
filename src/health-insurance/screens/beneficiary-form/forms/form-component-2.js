import React from "react";
import * as yup from "yup";
import { Navigation } from "react-native-navigation";
import { InputTextCustom, AutocompleteComponent } from "../../../components";
import { navigationConfig } from "../../register-screens";
import { Formik } from "formik";
import { Text, Button, Content, View } from "native-base";

import getConfigValidationForm from "./config-validate-form-2";
import styles from "../style";

export const FormComponent2 = (props) => {
    const validationSchema = getConfigValidationForm(yup, props.typeForm);
    const validate = (values, isValid, setFieldTouched) => {
        if (isValid && Object.keys(values).length > 12) {
            props.updateHolder(values, props.typeForm);
            Navigation.push(props.componentId, {
                component: {
                    ...navigationConfig[props.nextPage],
                    passProps: {
                        step: "step3",
                        typeForm: props.typeForm,
                    },
                },
            });
        } else {
            Object.keys(validationSchema.fields).forEach((name) => {
                setFieldTouched(name);
            });
        }
    };

    const getAutoCompleteValue = (field) => {
        if (!props.postalCodeAutoComplete) {
            return null;
        }

        return props.postalCodeAutoComplete[field];
    };

    const fetchAddressByPostalCode = (postalCode) => {
        if (postalCode && postalCode.length === 8) {
            props.fetchAddressByPostalCode(postalCode);
        }
    };
    return (
        <Formik
            initialValues={{ ...props.order[props.typeForm] }}
            validationSchema={validationSchema}
        >
            {({
                values,
                handleChange,
                setFieldTouched,
                setFieldValue,
                errors,
                touched,
                isValid,
            }) => {
                const methods = {
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldTouched,
                    setFieldValue,
                };

                return (
                    <Content>
                        <View>
                            {(props.typeForm === "financialResponsible" ||
                                props.typeForm === "holder") && (
                                <>
                                    <InputTextCustom
                                        label="Email*"
                                        name="email"
                                        placeholder="Qual o seu email?"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        {...methods}
                                    />
                                    <InputTextCustom
                                        label="Celular*"
                                        name="phone"
                                        placeholder="(xx) xxxxx-xxxx"
                                        keyboardType="number-pad"
                                        {...methods}
                                    />
                                </>
                            )}
                            <InputTextCustom
                                label="Carteina nacional de saúde (CNS)*"
                                name="cns"
                                placeholder="00000000"
                                keyboardType="number-pad"
                                {...methods}
                            />

                            <AutocompleteComponent
                                label="Profissão"
                                name="occupation"
                                placeholder="Selecione"
                                value="Analista"
                                autocompleteValue={props.occupation}
                                {...methods}
                            />

                            <InputTextCustom
                                label="CEP*"
                                name="postalCode"
                                placeholder="00000-000"
                                keyboardType="number-pad"
                                handleBlur={fetchAddressByPostalCode}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Endereço*"
                                name="address"
                                placeholder="Qual o seu endereço?"
                                autocompleteValue={getAutoCompleteValue(
                                    "street"
                                )}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Complemento"
                                name="addressComplement"
                                placeholder=""
                                {...methods}
                            />

                            <InputTextCustom
                                label="Número*"
                                name="addressNumber"
                                keyboardType="number-pad"
                                placeholder=""
                                {...methods}
                            />

                            <InputTextCustom
                                label="Estado*"
                                name="state"
                                placeholder="DF"
                                autocompleteValue={getAutoCompleteValue(
                                    "state"
                                )}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Cidade*"
                                name="city"
                                placeholder="Brasilia"
                                autocompleteValue={getAutoCompleteValue("city")}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Bairro*"
                                name="neighborhood"
                                placeholder="Bairro"
                                autocompleteValue={getAutoCompleteValue(
                                    "neighborhood"
                                )}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Peso (kg)*"
                                name="weight"
                                keyboardType="number-pad"
                                placeholder="Peso"
                                {...methods}
                            />

                            <InputTextCustom
                                label="Altura (cm)*"
                                name="height"
                                keyboardType="number-pad"
                                placeholder="Altura"
                                {...methods}
                            />
                        </View>
                        <View>
                            <Button
                                full
                                rounded
                                style={styles.footerButtonForm}
                                onPress={() => {
                                    validate(values, isValid, setFieldTouched);
                                }}
                            >
                                <Text>PRÓXIMO</Text>
                            </Button>
                        </View>
                    </Content>
                );
            }}
        </Formik>
    );
};
