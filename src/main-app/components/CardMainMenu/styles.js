import { StyleSheet } from "react-native";
import { responsiveWidth as rw } from "../../util/Dimensions";

export default StyleSheet.create({
    container: {
        margin: rw("4%"),
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: rw('0.2%'),
        borderRadius: rw("2.3%"),
        width: rw("35%"),
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
});
