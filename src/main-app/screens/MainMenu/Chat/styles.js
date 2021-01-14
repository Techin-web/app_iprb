import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#fff",
    },
    Container: {
        paddingVertical: rh("5%"),
        alignItems: "center",
    },
    MainIcon: {
        shadowColor: "#000",
        textShadowColor: "rgba(0, 0, 0, 0.55)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    Subtitle: {
        textAlign: "center",
        fontWeight: "700",
        width: "85%",
        fontSize: rw("4%"),
        textTransform: "uppercase",
        color: "#515151",
        marginBottom: rh("3%"),
        marginTop: rh("2%"),
    },
    Card: {
        backgroundColor: "#537AF5",
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        paddingLeft: rw("3%"),
        paddingVertical: rh("1%"),
        marginBottom: rh("3%"),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 4,
    },
    CardName: {
        color: "#fff",
        fontSize: rw("5%"),
        fontWeight: "700",
        textTransform: "uppercase",
    },
    CardIconHolder: {
        flexBasis: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    CardNameHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
