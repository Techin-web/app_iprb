import { Dimensions, StyleSheet } from "react-native";
import defaultStyle from "../defaultStyle";

const styles = StyleSheet.create({
    ...defaultStyle,
    inputItem: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 3,
        borderColor: "rgba(64, 85, 179, 0.2)",
        marginTop: 10,
        width: Dimensions.get("window").width - 50,
        marginLeft: 0,
    },
    input: {
        textAlign: "center",
        color: "#4055B3",
    },
    footerButtonPayment: {
        backgroundColor: "#5A74EB",
        borderRadius: 5,
    },
    footerButtonResend: {
        backgroundColor: "white",
        marginTop: 30,
    },
    textResend: {
        color: "#4055B3",
    },
    marginLeft: {
        marginLeft: -10,
    },
    marginTextDivisor: {
        marginTop: 40,
        marginBottom: 40,
    },
    viewInformation: {
        marginBottom: 20,
    },
    title: {
        fontSize: 15,
        marginBottom: 3,
        fontWeight: "bold",
    },
    titleMarginTop: {
        marginTop: 25,
    },
    text: {
        marginLeft: 10,
    },
    viewCode: {
        alignItems: "center",
    },
    textButton: {
        color: "white",
    },
    itemAnswerText: {
        marginLeft: 20,
        color: "#4055B3",
        fontWeight: "500",
    },
    checkBoxOption: {
        paddingTop: 25,
    },
});

export default styles;
