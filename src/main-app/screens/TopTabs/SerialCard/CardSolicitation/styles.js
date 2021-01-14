import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#fff",
    },
    Container: {
        backgroundColor: "#FFF",
        alignItems: "center",
        paddingVertical: rh("5%"),
    },
    Title: {
        color: "#3752A6",
        textTransform: "uppercase",
        fontSize: rw("5%"),
        fontWeight: "700",
        marginBottom: rh("2%"),
        letterSpacing: 0.5,
    },
    Subtitle: {
        fontSize: rw("3.2%"),
        width: "80%",
        textAlign: "center",
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#707070",
        marginBottom: rh("3.5%"),
    },
    ButtonHolder: {
        marginTop: rh("2%"),
        width: "100%",
        alignItems: "center",
    },
});