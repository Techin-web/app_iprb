import React, { Component, Fragment } from "react";
import {
    Alert,
    Modal,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Text,
    ActivityIndicator,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { INSTITUTION_ID } from "../../../config/institution-metadata";
import { Formik } from "formik";
import { CheckBox } from "native-base";
import { isCPFValid } from "../../../util/CPF-validator";
import KeyboardAwareScrollView from "../../../components/KeyboardAwareScrollView";
import MaskedInput from "../../../components/MaskedInput";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import Pdf from "react-native-pdf";
import logo from "../../../assets/logo.png";
import API from "../../../services/axios-instance";
import Animation from './animation';

import FormSchema from "./form-schema";
import styles from "./styles";

class SignUp extends Component {
    state = {
        termo: null,
        modalIsOpen: false,
        loading: false,
        acceptTerm: false,
        openAanimation: false
    };

    componentDidMount = async () => {
        const { data } = await API.get(`/termos/${INSTITUTION_ID}/APP`);

        this.setState({ termo: data });
    };

    setModalVisibilityState = (newState) => {
        this.setState({ modalIsOpen: newState });
    };

    showErrosAlert = (errors) => {
        const firstError = Object.values(errors)[0];
        Alert.alert("Campos Obrigatórios", firstError);
    };

    toggleAcceptTerm = () => {
        this.setState({ acceptTerm: !this.state.acceptTerm });
    };

    onSubmittedPostHandler = async (formData) => {
        try {
            if (!isCPFValid(formData.cpf)) {
                return Alert.alert(
                    "CPF Inválido",
                    "Verifique o CPF digitado e garanta que ele seja válido."
                );
            }

            if (formData.password !== formData.confirmPassword) {
                return Alert.alert(
                    "As senhas não conferem",
                    "Garanta que as senhas digitadas sejam iguais."
                );
            }

            if (!this.state.acceptTerm) {
                return Alert.alert(
                    "É necessário aceitar os termos",
                    "Leia e aceite os termos para finalizar seu cadastro."
                );
            }

            this.setState({ loading: true });

            const dataToPost = {
                id_instituicao: INSTITUTION_ID,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                cpf: formData.cpf,
                cep: formData.cep,
            };

            await API.post("/users", dataToPost);

            this.setState({ loading: false });

            this.setState({ openAanimation: true });
        } catch (err) {
            this.setState({ loading: false });

            if (err.response) {
                if (err.response.data) {
                    Alert.alert(
                        "Ocorreu um erro",
                        `${err.response.data.error}`
                    );
                }
            }
        }
    };

    render() {
        const { modalIsOpen, termo, loading, acceptTerm, openAanimation } = this.state;

        let pdfUri;
        if (termo) {
            pdfUri = `${API.defaults.baseURL}/files/${termo.filename}`;
        }

        return (
            openAanimation
                ?   <Animation props={this.props} />
                :   <KeyboardAwareScrollView>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalIsOpen}
                        >
                            <Pdf source={{ uri: pdfUri }} style={styles.Pdf} />
                            <TouchableOpacity
                                style={styles.closeModalIcon}
                                onPress={() => this.setModalVisibilityState(false)}
                            >
                                <View>
                                    <Icon name="long-arrow-left" size={22} />
                                </View>
                            </TouchableOpacity>
                        </Modal>
                        <ScrollView contentContainerStyle={styles.ScrollView}>
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                    phone: "",
                                    cpf: "",
                                    cep: "",
                                }}
                                initialErrors={{
                                    initialError:
                                        "É necessários preencher todos os campos",
                                }}
                                onSubmit={(values) => {
                                    values.email = values.email.toLowerCase();

                                    this.onSubmittedPostHandler(values);
                                }}
                                validationSchema={FormSchema}
                            >
                                {(props) => (
                                    <Fragment>
                                        <Image
                                            source={logo}
                                            resizeMode="stretch"
                                            style={styles.Logo}
                                        />
                                        <Input
                                            placeholder="NOME"
                                            dense
                                            value={props.values.name}
                                            onChangeText={props.handleChange("name")}
                                        />
                                        <Input
                                            placeholder="E-MAIL"
                                            dense
                                            value={props.values.email}
                                            onChangeText={props.handleChange("email")}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                        />
                                        <MaskedInput
                                            placeholder="TELEFONE () - "
                                            type={"cel-phone"}
                                            options={{
                                                maskType: "BRL",
                                                withDDD: true,
                                                dddMask: "(99) ",
                                            }}
                                            dense
                                            value={props.values.phone}
                                            onChangeText={props.handleChange("phone")}
                                        />
                                        <MaskedInput
                                            placeholder="CPF"
                                            type={"cpf"}
                                            dense
                                            value={props.values.cpf}
                                            onChangeText={props.handleChange("cpf")}
                                        />
                                        <MaskedInput
                                            placeholder="CEP"
                                            type={"custom"}
                                            options={{ mask: "99.999-999" }}
                                            dense
                                            value={props.values.cep}
                                            onChangeText={props.handleChange("cep")}
                                        />
                                        <Input
                                            placeholder="SENHA"
                                            autoCapitalize="none"
                                            dense
                                            secureTextEntry
                                            value={props.values.password}
                                            onChangeText={props.handleChange(
                                                "password"
                                            )}
                                        />
                                        <Input
                                            placeholder="CONFIRMAR SENHA"
                                            autoCapitalize="none"
                                            dense
                                            secureTextEntry
                                            value={props.values.confirmPassword}
                                            onChangeText={props.handleChange(
                                                "confirmPassword"
                                            )}
                                        />
                                        <View style={styles.CheckBoxHolder}>
                                            <View style={styles.CheckBox}>
                                                <CheckBox
                                                    checked={acceptTerm}
                                                    onPress={this.toggleAcceptTerm}
                                                    color="#246bb3"
                                                />
                                            </View>
                                            <Text>Li e concordo com os </Text>
                                            <Text
                                                style={styles.TermsButton}
                                                onPress={() =>
                                                    this.setModalVisibilityState(true)
                                                }
                                            >
                                                Termos de Uso
                                            </Text>
                                        </View>
                                        {loading ? (
                                            <ActivityIndicator
                                                size="large"
                                                color="#246bb3"
                                            />
                                        ) : (
                                            <Fragment>
                                                <Button
                                                    dark
                                                    bold
                                                    title="Cadastrar"
                                                    disabled={loading}
                                                    onPress={
                                                        Object.keys(props.errors).length
                                                            ? () =>
                                                                this.showErrosAlert(
                                                                    props.errors
                                                                )
                                                            : () => props.handleSubmit()
                                                    }
                                                />
                                                <Button
                                                    title="Voltar"
                                                    bold
                                                    onPress={() =>
                                                        Navigation.pop(
                                                            this.props.componentId
                                                        )
                                                    }
                                                />
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </Formik>
                        </ScrollView>
                    </KeyboardAwareScrollView>
        );
    }
}

SignUp.options = {
    topBar: {
        visible: false,
    },
};

export default SignUp;
