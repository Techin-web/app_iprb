import React, { Component } from "react";
import {
    View,
    Image,
    ActivityIndicator,
    Text,
    Alert,
    Keyboard,
    TouchableOpacity,
    Linking,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../routes";
import {
    INSTITUTION_ID,
    INSTITUTION_NAME,
} from "../../../config/institution-metadata";
import { login } from "../../../services/auth-token";
import Icon from "react-native-vector-icons/dist/Feather";
import KeyboardAwareView from "../../../components/KeyboardAwareScrollView";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import API from "../../../services/axios-instance";

import styles from "./styles";

const logo = require("../../../assets/logo.png");

class SignIn extends Component {
    state = {
        formData: {
            email: "",
            password: "",
        },
        loading: false,
        keyboardDidShow: false,
    };

    componentDidMount = () => {
        Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
    };

    _keyboardDidShow = () => {
        this.setState({ keyboardDidShow: true });
    };

    _keyboardDidHide = () => {
        this.setState({ keyboardDidShow: false });
    };

    onSubmittedSignInHandler = async () => {
        try {
            Keyboard.dismiss();

            this.setState({ loading: true });

            const formData = { ...this.state.formData };
            formData.email = formData.email.toLowerCase();

            const { data } = await API.post("/sessions", {
                id_instituicao: INSTITUTION_ID,
                email: formData.email,
                password: formData.password,
            });

            if (data.user.permission !== 1) {
                throw new Error("Error. Unauthorized user ");
            }

            if (!data.token) {
                throw new Error("Error. Could not get the correct token.");
            }

            await login(data.token);

            Navigation.setStackRoot(this.props.componentId, {
                component: {
                    name: navigationName.bottomTabs,
                },
            });
        } catch (err) {
            this.setState({ loading: false });

            Alert.alert(
                "Erro ao entrar!",
                "Por favor verifique os campos e tente novamente!"
            );
        }
    };

    onChangedInputHandler = (text, attribute) => {
        const formData = { ...this.state.formData };
        formData[attribute] = text;

        this.setState({ formData });
    };

    render() {
        let getHelpButton = (
            <TouchableOpacity
                style={styles.HelpButton}
                disabled={this.state.loading}
                onPress={() =>
                    Linking.openURL(
                        `mailto:suporte@tech-inweb.com.br?subject=Suporte - ${INSTITUTION_NAME}`
                    )
                }
            >
                <Icon name="help-circle" size={18} color="#535353" />
                <Text style={styles.HelpText}>Dúvidas? Fale conosco</Text>
            </TouchableOpacity>
        );

        if (this.state.loading || this.state.keyboardDidShow) {
            getHelpButton = null;
        }

        return (
            <KeyboardAwareView>
                <View style={styles.Container}>
                    <Image
                        source={logo}
                        resizeMode="stretch"
                        style={styles.Logo}
                    />
                    <Input
                        placeholder="E-MAIL"
                        onChangeText={(txt) =>
                            this.onChangedInputHandler(txt, "email")
                        }
                        value={this.state.formData.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="SENHA"
                        onChangeText={(txt) =>
                            this.onChangedInputHandler(txt, "password")
                        }
                        value={this.state.formData.password}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <Button
                        title="Entrar"
                        dark
                        disabled={this.state.loading}
                        onPress={this.onSubmittedSignInHandler}
                    />
                    <Button
                        title="Cadastrar"
                        light
                        disabled={this.state.loading}
                        onPress={() =>
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: navigationName.signUp,
                                },
                            })
                        }
                    />
                    <Text
                        style={styles.ForgotButton}
                        onPress={
                            !this.state.loading
                                ? () =>
                                      Navigation.push(this.props.componentId, {
                                          component: {
                                              name:
                                                  navigationName.forgotPassword,
                                          },
                                      })
                                : null
                        }
                    >
                        Esqueci a Senha
                    </Text>
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={styles.Indicator}
                        color="#364F9E"
                    />
                    {getHelpButton}
                </View>
            </KeyboardAwareView>
        );
    }
}

SignIn.options = {
    topBar: {
        visible: false,
    },
};

export default SignIn;
