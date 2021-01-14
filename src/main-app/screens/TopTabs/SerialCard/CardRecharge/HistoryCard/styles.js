import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../../util/Dimensions";

export default StyleSheet.create({
    RechargeCard: {
        backgroundColor: "#fff",
        borderRadius: 9,
        width: "80%",
        flexDirection: "row",
        marginBottom: rh("3%"),
    },
    HistoryDateContainer: {
        backgroundColor: "#3F5EBE",
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
        padding: rh("2%"),
        alignSelf: "flex-start",
        paddingVertical: rh("3%"),
    },
    HistoryDateText: {
        color: "#fff",
        fontSize: rw("4.5%"),
        fontWeight: "700",
    },
    HistoryValueHolder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    HistoryValueText: {
        alignSelf: "center",
        fontWeight: "700",
        fontSize: rw("4%"),
        color: "#3F5EBE",

        marginBottom: rh(".5%"),
    },
    HistoryStatusText: {
        fontSize: rw("2.5%"),
        fontWeight: "700",
        textTransform: "uppercase",
    },
    BoletoButton: {
        marginTop: rh("1.5%"),
    },
    OrangeText: {
        color: "#EBB755",
    },
    GreenText: {
        color: "#0ECB1A",
    },
    RedText: {
        color: "#CB350E",
    },
    blueText: {
        color: "#1577C3",
    },
});
