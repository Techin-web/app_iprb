import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    Pdf: {
        flex: 1,
    },
    ScrollView: {
        width: "100%",
        alignItems: "center",
        paddingVertical: rh("8%"),
        backgroundColor: "#fff",
    },
    Logo: {
        height: rw("40%"),
        width: rw("40%"),
        marginBottom: rh("5%"),
    },
    closeModalIcon: {
        position: "absolute",
        top: "50%",
        left: "5%",
        zIndex: 1000,
        padding: 5,
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: 3,
    },
    CheckBoxHolder: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: rh("3%"),
    },
    CheckBox: {
        marginRight: 20,
    },
    TermsButton: {
        color: "#246bb3",
    },
});
