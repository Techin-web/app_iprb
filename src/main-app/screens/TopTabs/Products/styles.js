import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#3F5EBE",
    },
    Container: {
        paddingVertical: rh("2%"),
        alignItems: "center",
        height: "100%",
        backgroundColor: "#3F5EBE",
    },
    TopBox: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 5,
        marginBottom: rh("4%"),
        paddingVertical: rh("2%"),
        paddingHorizontal: rw("3%"),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    TopBoxText: {
        color: "#3F5EBE",
        fontWeight: "bold",
        fontSize: rw("4%"),
        marginBottom: rh("1.5%"),
    },
    TopButton: {
        backgroundColor: "#3F5EBE",
        alignItems: "center",
        paddingVertical: rh("1%"),
        borderRadius: 3,
    },
    TopButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: rw("4%"),
    },
    MainIcon: {
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        marginBottom: rh("2%"),
    },
    Title: {
        fontSize: rw("6%"),
        color: "#fff",
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: rh("3%"),
    },
    Subtitle: {
        fontSize: rw("3.8%"),
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "700",
        width: "85%",
        marginBottom: rh("6%"),
    },
    ButtonsHolder: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: rh("3%"),
        width: rw("90%"),
    },
    ButtonsView: {
        justifyContent: "center",
        alignItems: "center",
        width: rw("83%"),
        paddingVertical: rw("2%"),
    },
    ButtonIcon: {
        marginBottom: rh("1%"),
    },
    CaixaIcon: {
        width: rw("30%"),
        height: rw("12%"),
        marginBottom: rh("1%"),
    },
    AxaIcon: {
        height: rw("12%"),
        marginBottom: rh("1%"),
    },
    SecondaryIcon: {
        width: rw("11%"),
        height: rw("5%"),
    },
    TooSegurosIcon: {
        width: rw("22%"),
        height: rw("16%"),
    },
    CenteredItem: {
        justifyContent: "center",
    },
});
