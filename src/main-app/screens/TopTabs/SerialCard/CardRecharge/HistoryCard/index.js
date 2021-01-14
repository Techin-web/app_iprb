import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";

import styles from "./styles";

const mes = [
    "JAN",
    "FEB",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AUG",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
];

export default function RechargeCard({ recharge }) {
    let status;
    let isBoletoButtonVisible = true;
    const rechargeCreation = new Date(recharge.createdAt);
    const month = mes[rechargeCreation.getMonth()];
    const day = rechargeCreation.toLocaleDateString("en-us").split("/")[1];
    const value = recharge.value.toFixed(2).toString().replace(".", ",");

    const statusStyle = [styles.HistoryStatusText];

    switch (recharge.status) {
        case "waiting_payment":
        case "processing":
            statusStyle.push(styles.OrangeText);
            status = "Processando";
            break;
        case "paid":
            statusStyle.push(styles.GreenText);
            status = "Pago";
            isBoletoButtonVisible = false;
            break;
        case "refused":
            statusStyle.push(styles.RedText);
            status = "Não Pago";
            break;
        default:
            break;
    }

    return (
        <View style={styles.RechargeCard}>
            <View style={styles.HistoryDateContainer}>
                <Text style={styles.HistoryDateText}>{day}</Text>
                <Text style={styles.HistoryDateText}>{month}</Text>
            </View>
            <View style={styles.HistoryValueHolder}>
                <Text style={styles.HistoryValueText}>R${value}</Text>
                <Text style={statusStyle}>{status}</Text>
                {isBoletoButtonVisible ? (
                    <TouchableOpacity
                        style={styles.BoletoButton}
                        onPress={() => Linking.openURL(recharge.boleto_url)}
                    >
                        <Text style={styles.blueText}>Visualizar Boleto</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}
