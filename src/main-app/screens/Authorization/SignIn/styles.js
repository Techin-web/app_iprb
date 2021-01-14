import { StyleSheet, Platform } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    Logo: {
        height: rw("45%"),
        width: rw("45%"),
        marginBottom: rh("6%"),
    },
    ForgotButton: {
        color: "#364F9E",
        fontSize: 16,
        textTransform: "uppercase",
        marginTop: rh("2.5%"),
        fontWeight: "700",
    },
    Indicator: {
        marginTop: rh("1%"),
    },
    HelpButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: rh("1%"),
        position: "absolute",
        bottom: Platform.OS === "ios" ? 80 : 10,
    },
    HelpText: {
        color: "#535353",
        fontWeight: "bold",
        marginLeft: 5,
    },
});
