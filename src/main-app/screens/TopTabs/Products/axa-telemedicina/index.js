import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { ScrollView, View, Text, Image, Alert } from "react-native";
import KeyboardAwareScrollView from "../../../../components/KeyboardAwareScrollView";
import Input from "../../../../components/Input";
import MaskedInput from "../../../../components/MaskedInput";
import Button from "../../../../components/Button";
import { navigationName } from "../../../../routes";
import formValidation from './form-validation';
import * as yup from "yup";
import { Formik } from "formik";

import styles from "./styles";

import Axa from "../../../../assets/axa.png";

class Telemedicina extends Component {
    state = {
        formData: {
            name: "",
            cpf: "",
            email: "",
            phone: "",
            birth: "",
            cep: "",
        },
        newScreen: false,
    };

    onChangedInputHandler = (value, attribute) => {
        const { formData } = { ...this.state };

        formData[attribute] = value;

        this.setState(formData);
    };

    cepMask = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    };

    goToNextScreen = () => {
        const { formData } = this.state;

        //valida formulario

        Navigation.push(this.props.componentId, {
            component: {
                name: navigationName.paymentScreen,
                passProps: {
                    user: formData,
                    plan: this.props.plan,
                    componentId: this.props.componentId
                }
            },
        });
    };


    render() {
        const { formData } = this.state;

        return (
            // <Formik
            //     initialValues={{}}
            //     validationSchema={formValidation(yup)}
            // >
            //     {({
            //         values,
            //         handleSubmit,
            //         handleChange,
            //         setFieldTouched,
            //         setFieldValue,
            //         errors,
            //         touched,
            //         isValid,
            //     }) => {
            //         const methods = {
            //             values,
            //             errors,
            //             touched,
            //             handleChange,
            //             setFieldTouched,
            //             setFieldValue,
            //         };

            //         const invalidForm =
            //             !isValid || Object.keys(values).length === 0;

                    <KeyboardAwareScrollView>
                        <ScrollView style={styles.ScrollView}>
                            <View style={styles.Container}>
                                <Image source={Axa} style={styles.MainIcon} />
                                <Text style={styles.Subtitle}>
                                    Para concluir a venda, é necessário preencher o
                                    formulário abaixo com os dados do comprador.
                                </Text>
                                <Input
                                    placeholder="NOME COMPLETO*"
                                    dense
                                    small
                                    value={formData.name}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "name")
                                    }
                                />
                                <Input
                                    placeholder="E-MAIL*"
                                    dense
                                    small
                                    value={formData.email}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "email")
                                    }
                                />
                                <MaskedInput
                                    type="cpf"
                                    placeholder="CPF*"
                                    dense
                                    small
                                    value={formData.cpf}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "cpf")
                                    }
                                />
                                <MaskedInput
                                    type="cel-phone"
                                    options={{
                                        maskType: "BRL",
                                        withDDD: true,
                                        dddMask: "(99) ",
                                    }}
                                    placeholder="TELEFONE () -*"
                                    dense
                                    small
                                    value={formData.phone}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "phone")
                                    }
                                />
                                <MaskedInput
                                    type={"datetime"}
                                    options={{
                                        format: "DD/MM/YYYY",
                                    }}
                                    placeholder="DATA DE NASCIMENTO*"
                                    dense
                                    small
                                    value={formData.birth}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "birth")
                                    }
                                />
                                <Input
                                    placeholder="CEP*"
                                    dense
                                    small
                                    value={this.cepMask(formData.cep)}
                                    onChangeText={(text) =>
                                        this.onChangedInputHandler(text, "cep")
                                    }
                                    keyboardType={"numeric"}
                                />
                                <View style={styles.ButtonHolder}>
                                    <Button
                                        title="Finalizar"
                                        bold
                                        dark
                                        // disabled={invalidForm}
                                        onPress={() => this.goToNextScreen()}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
            // </Formik>
        );
    }
}

Telemedicina.options = {
    topBar: {
        title: {
            text: "AXA | Telemedicina",
        },
    },
};

export default Telemedicina;
