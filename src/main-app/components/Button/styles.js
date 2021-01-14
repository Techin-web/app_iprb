import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../util/Dimensions";

export default StyleSheet.create({
    Button: {
        backgroundColor: "#537AF5",
        marginBottom: rh("2.2%"),
        width: "55%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: rh("1.5%"),
        borderRadius: 30,
        flexDirection: "row",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    LeftIconHolder: {
        marginRight: rw("3%"),
    },
    TextButton: {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "400",
        fontSize: rw("4.5%"),
    },
    DarkButton: {
        backgroundColor: "#3F5EBE",
    },
    ExtremeLightButton: {
        backgroundColor: "#77A7E4",
    },
    BoldButtonText: {
        fontWeight: "700",
    },
    LargeButton: {
        width: "70%",
        paddingVertical: rh("1.6%"),
        borderRadius: 10,
    },
    ExtraLargeButton: {
        paddingVertical: rh("2%"),
    },
});
