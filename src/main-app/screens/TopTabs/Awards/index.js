import React, { Component } from "react";
import {
    ScrollView,
    RefreshControl,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import FoundationIcons from "react-native-vector-icons/dist/Foundation";
import Card from "./Card";
import { responsiveWidth as rw } from "../../../util/Dimensions";
import API from "../../../services/axios-instance";

import styles from "./styles";

class Awards extends Component {
    state = {
        loading: false,
        awards: [],
        userAmount: 0,
    };

    componentDidMount = () => {
        this.loadAwardsHandler();
    };

    amountToString = (amount) => {
        return amount.toFixed(2).toString().replace(".", ",");
    };

    loadAwardsHandler = async () => {
        try {
            this.setState({ loading: true });

            const { data } = await API.get("/premiacao");

            this.setState({
                loading: false,
                awards: data.awardsDetails,
                userAmount: data.userAmount,
            });
        } catch (err) {
            Alert.alert(
                "Ocorreu um erro ao carregar premiações. Tente novamente mais tarde."
            );
        }
    };

    withdrawHandler = async () => {
        try {
            const { userAmount } = { ...this.state };

            if (userAmount < 20) {
                return Alert.alert(
                    "Saldo Insuficiente",
                    "O saldo precisa ser maior que R$20 para realizar a retirada",
                    [
                        {
                            text: "ok",
                        },
                    ]
                );
            }

            this.setState({ loading: true });

            await API.post("/premiacao/saque/usuario", { observacao: "" });

            this.setState({ loading: false, userAmount: 0 });

            Alert.alert(
                "Saque realizado com sucesso!",
                "Dentro de 14 dias úteis o saldo será depositado em seu cartão."
            );
        } catch (err) {
            this.setState({ loading: false });

            if (err.response) {
                Alert.alert("Erro inesperado", err.response.data);
            }
        }
    };

    render() {
        const { loading, awards, userAmount } = { ...this.state };

        const renderedCards = (
            <View style={styles.CardsHolder}>
                {awards.length > 0 ? (
                    awards.map((premiacao) => (
                        <Card premiacao={premiacao} key={premiacao.sale_id} />
                    ))
                ) : (
                    <Text>Você ainda não possui vendas realizadas</Text>
                )}
            </View>
        );

        return (
            <ScrollView
                style={styles.ScrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={this.loadAwardsHandler}
                    />
                }
            >
                <View style={styles.Container}>
                    {/* <View style={styles.TopContent}>
                        <FoundationIcons
                            name="trophy"
                            color="#537AF5"
                            size={rw("30%")}
                        />
                        <Text style={styles.Title}>Premiação</Text>
                        <Text style={styles.Subtitle}>
                            Área destinada ao registro das vendas
                        </Text>
                    </View> */}
                    <View style={styles.BottomContent}>
                        <View style={styles.BottomContentHeader}>
                            <View style={styles.AmountView}>
                                <Text style={styles.BalanceText}>Saldo</Text>
                                <Text style={styles.AmountText}>
                                    R$
                                    {this.amountToString(userAmount)}
                                </Text>
                            </View>
                            <View style={styles.BottomContentHeaderRight}>
                                <TouchableOpacity
                                    style={styles.Button}
                                    disabled={loading}
                                    onPress={this.withdrawHandler}
                                >
                                    <Text style={styles.ButtonText}>
                                        Fazer Retirada
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.ButtonObservation}>
                                    *O valor mínimo para o saque é de R$20,00
                                </Text>
                            </View>
                        </View>
                        {renderedCards}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

Awards.navigationOptions = {
    title: "Premiação",
};

export default Awards;
