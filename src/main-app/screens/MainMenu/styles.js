import { StyleSheet } from "react-native";

import {
    responsiveHeight as rh,
    responsiveWidth as rw,
} from "../../util/Dimensions";

export default StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: rh("2%"),
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    Card1: {
        width: rw("90%"),
        minHeight: rh("14%"),
        marginBottom: rh("1.5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: rh("1%"),
        paddingHorizontal: rw("3%"),
        alignItems: "center",
        borderRadius: rw("1.5%"),
        backgroundColor: "#537AF5",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    Card1Left: {
        flexBasis: "30%",
        alignItems: "center",
    },
    Card1Right: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    Cards: {
        margin: rw("2%"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: rw("5%"),
        width: rw("39%"),
        height: rw("39%"),
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
    ContainerCards: {
        marginTop: rh("0.4%"),
        marginBottom: rh("6%"),
        paddingBottom: rh("11%"),
    },
    CardsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    Card1RightTitle: {
        textTransform: "uppercase",
        fontWeight: "bold",
        marginBottom: rw("1%"),
        color: "#fff"
    },
    Text: {
        fontSize: rw("4%"),
        color: "#000",
        textAlign: "center",
    },
    TextData: {
        fontSize: rw("7%"),
        color: "#fff",
        fontWeight: "700",
    },
    TextDay: {
        fontSize: rw("4%"),
        color: "#fff",
        fontWeight: "700",
    },
});
