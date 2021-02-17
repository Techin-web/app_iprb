import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";

export default function Card({ premiacao }) {
    const clientName = premiacao.client_name;
    const productName = premiacao.product_name;
    const saleCreatedAt = formattingDateHandler(premiacao.sale_createdAt);
    let notAvailableUntil = "-";
    let withdrawDate = "-";
    let status = "Não Pago";
    let statusBgColor = styles.RedStatus;

    function formattingDateHandler(date) {
        const parsedDate = new Date(date)
            .toLocaleDateString("en-us")
            .split("/");

        const formattedDate =
            parsedDate[1] + "/" + parsedDate[0] + "/" + parsedDate[2];

        return formattedDate;
    }

    if (!premiacao.paid && premiacao.status === "estorno") {
        status = "Estorno";
        statusBgColor = styles.OrangeStatus;
    }

    if (premiacao.paid) {
        notAvailableUntil = formattingDateHandler(
            premiacao.not_available_until
        );

        status = "Pago";
        statusBgColor = styles.GreenStatus;
    }

    if (premiacao.withdraw_date) {
        withdrawDate = formattingDateHandler(premiacao.withdraw_date);
    }

    return (
        <View style={styles.Card}>
            <View style={[styles.StatusHolder, statusBgColor]}>
                <Text style={styles.StatusText}>{status}</Text>
            </View>
            <Text style={styles.ProductName}>{productName}</Text>
            <View style={styles.ClientNameHolder}>
                <Text style={styles.ClientNameLabel}>Cliente</Text>
                <Text style={styles.ClientName}>{clientName}</Text>
            </View>
            <View style={styles.Grid}>
                <View style={styles.GridItem}>
                    <Text style={styles.GridItemLabel}>Venda</Text>
                    <Text>{saleCreatedAt}</Text>
                </View>
                <View style={styles.GridItem}>
                    <Text style={styles.GridItemLabel}>Disponível Em</Text>
                    <Text>{notAvailableUntil}</Text>
                </View>
                <View style={styles.GridItem}>
                    <Text style={styles.GridItemLabel}>Saque</Text>
                    <Text>{withdrawDate}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Card: {
        width: "80%",
        backgroundColor: "#fff",
        marginBottom: rh("4%"),
        paddingTop: rh("1.5%"),
        paddingBottom: rh("3%"),
        paddingHorizontal: rw("3%"),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    ProductName: {
        marginBottom: rh("2%"),
        maxWidth: "65%",
        textTransform: "uppercase",
        fontSize: rw("2.6%"),
        fontWeight: "700",
        color: "#717171",
    },
    StatusHolder: {
        position: "absolute",
        height: rh("4%"),
        alignItems: "center",
        justifyContent: "center",
        width: rw("25%"),
        top: rh("-2%"),
        right: 0,
    },
    RedStatus: {
        backgroundColor: "#F58977",
    },
    GreenStatus: {
        backgroundColor: "#8FE362",
    },
    OrangeStatus: {
        backgroundColor: "#ffa500",
    },
    StatusText: {
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
    },
    ClientNameHolder: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: rh("2%"),
    },
    ClientNameLabel: {
        textTransform: "uppercase",
        width: "30%",
        textAlign: "center",
        fontWeight: "700",
        fontSize: rw("4%"),
    },
    ClientName: {
        flex: 1,
        fontWeight: "300",
        textTransform: "uppercase",
    },
    Grid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    GridItem: {
        width: "33%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    GridItemLabel: {
        fontWeight: "700",
        fontSize: rw("3.4%"),
        marginBottom: rh(".6%"),
    },
});
