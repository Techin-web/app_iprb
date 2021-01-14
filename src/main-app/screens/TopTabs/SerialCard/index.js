import React, { Component } from "react";
import {
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../routes";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import { responsiveWidth as rw } from "../../../util/Dimensions";
import API from "../../../services/axios-instance";

import styles from "./styles";

class SerialCard extends Component {
    state = {
        cartaoUsuario: null,
        loading: false,
    };

    componentDidMount = async () => {
        this.setState({ loading: true });

        const { data } = await API.get("/cartao/usuario");

        this.setState({ cartaoUsuario: data, loading: false });
    };

    navigateToCardSolicitation = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: navigationName.cardSolicitation,
            },
        });
    };

    navigateToCardRecharge = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: navigationName.cardRecharge,
            },
        });
    };

    render() {
        const { cartaoUsuario, loading } = { ...this.state };

        let renderedContent = <ActivityIndicator />;
        if (!loading) {
            renderedContent = (
                <View style={styles.buttonsView}>
                    <TouchableOpacity
                        style={styles.Buttons}
                        onPress={
                            cartaoUsuario
                                ? this.navigateToCardRecharge
                                : this.navigateToCardSolicitation
                        }
                    >
                        <View>
                            <FontAwesome
                                name={
                                    cartaoUsuario
                                        ? "credit-card"
                                        : "credit-card-alt"
                                }
                                size={rw("12%")}
                                style={styles.ButtonIcon}
                                color={"#246bb3"}
                            />
                        </View>
                        <Text style={styles.TextButtons}>
                            {cartaoUsuario
                                ? "Recarregue seu Cartao"
                                : "Solicite seu cartão"}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Container}>
                    <FontAwesome
                        name="group"
                        size={rw("35%")}
                        color="#fff"
                        style={styles.Icon}
                    />
                    <Text style={styles.Title}>Você</Text>
                    <Text style={styles.Subtitle}>
                        Área destinada a quem pretende fazer renda extra
                        vendendo produtos como capitalização e planos de saúde
                        de baixo custo
                    </Text>
                    {renderedContent}
                </View>
            </ScrollView>
        );
    }
}

SerialCard.navigationOptions = {
    title: "Cartão",
    headerShown: false,
};

export default SerialCard;
