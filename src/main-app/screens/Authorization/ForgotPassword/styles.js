import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    KeyboardAwareScrollView: {
        backgroundColor: "#537AF5",
    },
    Container: {
        backgroundColor: "#537AF5",
        flex: 1,
        marginTop: rh("-5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    ForgotTitle: {
        color: "#fff",
        fontSize: rw("5%"),
        marginBottom: rh("4%"),
        textTransform: "uppercase",
        fontWeight: "700",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    Icon: {
        marginBottom: rh("5%"),
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    Paragraph: {
        width: "70%",
        textAlign: "center",
        fontSize: rw("4%"),
        color: "#fff",
        marginBottom: rh("4%"),
    },
    InputHolder: {
        marginBottom: rh("3%"),
        width: "100%",
        alignItems: "center",
    },
});
