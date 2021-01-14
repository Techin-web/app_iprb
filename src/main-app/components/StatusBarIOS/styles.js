import { StyleSheet, Platform } from "react-native";
import { responsiveHeight as rh } from "../../util/Dimensions";

export default StyleSheet.create({
    StatusBarIos: {
        height: Platform.OS === "ios" ? rh("4%") : 0,
    },
});
