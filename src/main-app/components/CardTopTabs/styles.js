import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../util/Dimensions";

export default StyleSheet.create({
    Buttons: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: rw("1.5%"),
        padding: rw("2%"),
        width: rw("42%"),
        height: rw("35%"),
        backgroundColor: "#fff",
        shadowColor: "#333",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    TextButtons: {
        fontSize: rw("3%"),
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#2B2B2B",
    },
    SecondaryIconHolder: {
        position: "absolute",
        top: 6,
        left: 6,
    },
});
