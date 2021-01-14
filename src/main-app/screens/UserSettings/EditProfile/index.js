import React, { Component, Fragment } from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { Navigation } from "react-native-navigation";
import { Formik } from "formik";
import Input from "../../../components/Input";
import MaskedInput from "../../../components/MaskedInput";
import Button from "../../../components/Button";
import LoadingScreen from "../../../components/LoadingScreen";
import formSchema from "./form-schema";
import API from "../../../services/axios-instance";

import styles from "./styles";

class EditProfile extends Component {
    state = {
        userData: {
            name: "",
            phone: "",
            cep: "",
            oldPassword: "",
        },
        loading: true,
    };

    componentDidMount = () => {
        this.loadInitialData();
        this.setState({ loading: false });
    };

    loadInitialData = () => {
        const user = this.props.user;

        const userData = { ...this.state.userData };
        userData.name = user.name || "";
        userData.phone = user.phone || "";
        userData.cep = user.cep || "";

        this.setState({ userData });
    };

    onChangedInputHandler = (value, attribute) => {
        const userData = { ...this.state.userData };
        userData[attribute] = value;

        this.setState({ userData });
    };

    onSubmittedFormHandler = async (formValues, errors) => {
        try {
            const firstError = Object.values(errors)[0];
            if (firstError) {
                return Alert.alert("Campos Obrigatórios.", firstError);
            }

            this.setState({ loading: true });

            const formData = { ...formValues };

            const { data } = await API.put("/users", formData);
            const updateUserData = this.props.onChangeUserData;

            updateUserData(data);

            Alert.alert("Usuário atualizado com sucesso.", null, [
                {
                    text: "Ok",
                    onPress: () => {
                        Navigation.pop(this.props.componentId);
                    },
                },
            ]);
        } catch (err) {
            this.setState({ loading: false });

            Alert.alert("", `${err.response.data.error}`);
        }
    };

    render() {
        return this.state.loading ? (
            <LoadingScreen indicatorColor="#537AF5" />
        ) : (
            <Formik
                initialValues={{
                    ...this.state.userData,
                }}
                initialErrors={{ error: "É necessário preencher sua senha" }}
                validationSchema={formSchema}
            >
                {(formikProps) => (
                    <View style={styles.MainContainer}>
                        <ScrollView style={styles.ScrollView}>
                            <View style={styles.Container}>
                                <Text style={styles.Title}>Editar Perfil</Text>
                                <Input
                                    placeholder="NOME"
                                    validatePlaceholder
                                    value={formikProps.values.name}
                                    onChangeText={formikProps.handleChange(
                                        "name"
                                    )}
                                />
                                <MaskedInput
                                    type="cel-phone"
                                    options={{
                                        maskType: "BRL",
                                        withDDD: true,
                                        dddMask: "(99) ",
                                    }}
                                    placeholder="TELEFONE"
                                    validatePlaceholder
                                    value={formikProps.values.phone}
                                    onChangeText={formikProps.handleChange(
                                        "phone"
                                    )}
                                />
                                <MaskedInput
                                    type="custom"
                                    options={{ mask: "99.999-999" }}
                                    placeholder="CEP"
                                    validatePlaceholder
                                    value={formikProps.values.cep}
                                    onChangeText={formikProps.handleChange(
                                        "cep"
                                    )}
                                />
                                <Input
                                    placeholder="CONFIRME SUA SENHA"
                                    validatePlaceholder
                                    secureTextEntry
                                    value={formikProps.values.oldPassword}
                                    onChangeText={formikProps.handleChange(
                                        "oldPassword"
                                    )}
                                />
                            </View>
                            <View style={styles.ButtonContainer}>
                                <Button
                                    dark
                                    bold
                                    title="Salvar"
                                    onPress={() =>
                                        this.onSubmittedFormHandler(
                                            formikProps.values,
                                            formikProps.errors
                                        )
                                    }
                                />
                            </View>
                        </ScrollView>
                    </View>
                )}
            </Formik>
        );
    }
}

EditProfile.options = {
    topBar: {
        title: {
            text: "Editar Perfil",
        },
    },
};

export default EditProfile;
