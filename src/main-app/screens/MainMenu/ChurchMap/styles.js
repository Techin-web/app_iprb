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
        paddingVertical: rh("7%"),
        alignItems: "center",
    },
    Title: {
        textTransform: "uppercase",
        fontSize: rw("7%"),
        fontWeight: "700",
        color: "#fff",
        marginBottom: rh("2%"),
    },
    MainIcon: {
        marginBottom: rh("5%"),
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    Subtitle: {
        textAlign: "center",
        width: "80%",
        fontSize: rw("4%"),
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#fff",
        marginBottom: rh("5%"),
    },
});
