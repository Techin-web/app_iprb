import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#fff",
    },
    TopContent: {
        alignItems: "center",
        paddingTop: rh("6%"),
        paddingBottom: rh("2%"),
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    Title: {
        color: "#3752A6",
        textTransform: "uppercase",
        fontSize: rw("6%"),
        fontWeight: "700",
        marginBottom: rh("2.5%"),
    },
    Subtitle: {
        fontSize: rw("4%"),
        width: "80%",
        textTransform: "uppercase",
        fontWeight: "300",
        textAlign: "center",
    },
    BottomContentHeader: {
        paddingVertical: rh("1.5%"),
        marginBottom: rh("4%"),
        // paddingHorizontal: rw("5%"),
        // flexDirection: "row",
        // justifyContent: "space-between",

        backgroundColor: "#eee",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    AmountView: {
        alignItems: "center",
        justifyContent: "center",
    },
    BalanceText: {
        color: "#000",
        fontWeight: "700",
        fontSize: rw("3.2%"),
        textTransform: "uppercase",
    },
    AmountText: {
        color: "#3752A6",
        fontWeight: "700",
        fontSize: rw("5.5%"),
    },
    BottomContentHeaderRight: {
        // width: "45%",
        // alignItems: "flex-end"
    },
    Button: {
        padding: 10,
        backgroundColor: "#105F9C",
        borderRadius: 6,
    },
    ButtonText: {
        color: "#fff",
        fontSize: rw("4%"),
        textTransform: "uppercase",
        fontWeight: "700",
    },
    ButtonObservation: {
        color: "#000",
        textAlign: "center",
        marginTop: rh(".5%"),
        fontSize: rw("3.4%"),
    },
    CardsHolder: {
        width: "100%",
        alignItems: "center",
    },
    FooterButtons: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
