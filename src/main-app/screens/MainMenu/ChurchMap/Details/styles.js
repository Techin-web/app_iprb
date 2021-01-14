import { StyleSheet } from "react-native";

import { responsiveHeight as rh } from "../../../../util/Dimensions";

export default StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#537AF5",
    },
    MapView: {
        width: "100%",
        height: "50%",
        marginBottom: rh("5%"),
    },
    BUttonHolder: {
        alignItems: "center",
    },
});
