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
        backgroundColor: "#fff",
        paddingTop: rh("7%"),
        paddingBottom: rh("5%"),
        alignItems: "center",
    },
    Title: {
        color: "#3752A6",
        textTransform: "uppercase",
        fontSize: rw("6%"),
        fontWeight: "700",
        marginBottom: rh("2%"),
    },
    MainIcon: {
        marginBottom: rh("3%"),
        textShadowColor: "rgba(0, 0, 0, 0.4)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    Subtitle: {
        textAlign: "center",
        fontWeight: "700",
        width: "65%",
        fontSize: rw("4%"),
        textTransform: "uppercase",
        color: "#515151",
        marginBottom: rh("5%"),
    },
    Card: {
        backgroundColor: "#537AF5",
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        paddingLeft: rw("3%"),
        paddingVertical: rh("3%"),
        marginBottom: rh("3%"),
        borderRadius: 5,

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
