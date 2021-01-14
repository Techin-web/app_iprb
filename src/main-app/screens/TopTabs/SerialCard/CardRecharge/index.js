import React, { Fragment, Component, createRef } from "react";
import {
    Text,
    View,
    TextInput,
    Alert,
    ScrollView,
    Linking,
} from "react-native";
import { responsiveWidth as rw } from "../../../../util/Dimensions";
import Octicons from "react-native-vector-icons/dist/Octicons";
import DropDownPicker from "react-native-dropdown-picker";
import RechargeCard from "./HistoryCard";
import { TextInputMask } from "react-native-masked-text";
import Button from "../../../../components/Button";
import API from "../../../../services/axios-instance";

import styles from "./styles";

class CardRecharge extends Component {
    constructor(props) {
        super(props);
        this.inputValue = createRef();
    }

    state = {
        picker: null,
        filterRechargesPicker: 5,
        value: "R$150",
        rechargesHistory: [],
    };

    componentDidMount = async () => {
        const { data } = await API.get("/solicitacaorecarga/usuario");
        this.setState({ rechargesHistory: data });
    };

    onSubmittedFormHandler = async () => {
        const { picker, value } = { ...this.state };

        let pickerValue = 150;
        let inputValueText = "R$150";

        if (!picker) {
            return Alert.alert("Selecione o valor da recarga!");
        }

        if (picker === 2) {
            pickerValue = this.inputValue.current.getRawValue();
            inputValueText = value;
        }

        if (pickerValue < 150) {
            return Alert.alert(
                "Valor Mínimo",
                "Garanta que o valor solicitado seja maior ou igual a R$150."
            );
        }

        Alert.alert("Deseja efetuar a recarga?", "Valor: " + inputValueText, [
            {
                text: "Confirmar",
                onPress: () => this.handleRecharge(pickerValue),
            },
            {
                text: "Cancelar",
            },
        ]);
    };

    handleRecharge = async (value) => {
        const dataToPost = { value };

        const { data } = await API.post("/solicitacaorecarga", dataToPost);
        const transactionData = data;
        const updatedRechargesHistory = [...this.state.rechargesHistory];

        updatedRechargesHistory.unshift(transactionData);

        this.setState({ rechargesHistory: updatedRechargesHistory });

        Alert.alert(
            "Quase pronto!",
            "Confirme aqui para visualizar seu boleto.",
            [
                {
                    text: "Ver boleto",
                    onPress: () => Linking.openURL(transactionData.boleto_url),
                },
                {
                    text: "Mais tarde",
                },
            ]
        );
    };

    render() {
        const {
            picker,
            value,
            rechargesHistory,
            filterRechargesPicker,
            inputValue,
        } = {
            ...this.state,
        };

        let inputGroup = null;
        if (picker === 2) {
            inputGroup = (
                <Fragment>
                    <Text style={styles.InputLabel}>
                        Informe o valor da recarga
                    </Text>
                    <TextInputMask
                        type="money"
                        options={{ precision: 0 }}
                        style={styles.Input}
                        value={value}
                        onChangeText={(text) => this.setState({ value: text })}
                        ref={this.inputValue}
                    />
                </Fragment>
            );
        }

        let renderedRechargesHistory;
        if (rechargesHistory.length) {
            renderedRechargesHistory = (
                <Fragment>
                    <DropDownPicker
                        items={[
                            { label: "5 últimas", value: 5 },
                            { label: "10 últimas", value: 10 },
                            { label: "30 últimas", value: 30 },
                            { label: "Todas as recargas", value: null },
                        ]}
                        defaultValue={filterRechargesPicker}
                        placeholder="Todas as recargas"
                        containerStyle={styles.FilterPickerContainer}
                        style={styles.Picker}
                        labelStyle={styles.PickerLabel}
                        dropDownStyle={styles.PickerDropdown}
                        onChangeItem={(item) =>
                            this.setState({ filterRechargesPicker: item.value })
                        }
                    />
                    {rechargesHistory.map((recharge, index) => {
                        if (
                            filterRechargesPicker &&
                            index >= filterRechargesPicker
                        ) {
                            return null;
                        }
                        return (
                            <RechargeCard
                                recharge={recharge}
                                key={recharge.id}
                            />
                        );
                    })}
                </Fragment>
            );
        }

        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Container}>
                    <Octicons
                        name="credit-card"
                        size={rw("40%")}
                        color="#537AF5"
                    />
                    <Text style={styles.MainText}>
                        Efetue a recarga para usar seu cartão como quiser
                    </Text>
                    <Text style={styles.SecondaryText}>
                        * O valor mínimo para recarga é de R$150,00
                    </Text>
                    <DropDownPicker
                        items={[
                            { label: "R$150,00", value: 1 },
                            { label: "Digite o valor", value: 2 },
                        ]}
                        defaultValue={picker}
                        placeholder="Selecione o valor"
                        containerStyle={styles.PickerContainer}
                        style={styles.Picker}
                        labelStyle={styles.PickerLabel}
                        dropDownStyle={styles.PickerDropdown}
                        onChangeItem={(item) =>
                            this.setState({ picker: item.value })
                        }
                    />

                    <View style={styles.InputHolder}>{inputGroup}</View>

                    <Button
                        title="Recarregar"
                        dark
                        bold
                        onPress={this.onSubmittedFormHandler}
                    />

                    <View style={styles.RecargasBox} />

                    <View style={styles.HistoryContainer}>
                        <TextInput style={styles.HistoryTitle}>
                            Histórico de Recargas
                        </TextInput>
                        {renderedRechargesHistory}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

CardRecharge.options = {
    topBar: {
        title: {
            text: "Recargas",
        },
    },
};

export default CardRecharge;
