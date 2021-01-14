import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#537AF5",
    },
    Container: {
        paddingVertical: rh("10%"),
        justifyContent: "center",
        alignItems: "center",
    },
    Icon: {
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
        width: "90%",
        marginBottom: rh("6%"),
    },
    ButtonsView: {
        alignItems: "center",
        width: rw("83%"),
    },
    Buttons: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: rw("3%"),
        borderRadius: rw("3%"),
        width: rw("42%"),
        height: rw("35%"),
        backgroundColor: "#FFF",
        shadowColor: "#333",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    ButtonIcon: {
        marginBottom: rh("1%"),
    },
    TextButtons: {
        fontSize: rw("4%"),
        textAlign: "center",
        textTransform: "uppercase",
    },
});
