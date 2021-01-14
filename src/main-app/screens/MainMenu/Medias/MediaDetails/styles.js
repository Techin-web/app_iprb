import { StyleSheet } from "react-native";

import { responsiveHeight as rh } from "../../../../util/Dimensions";

export default StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#4370AD",
        paddingTop: rh("2%"),
    },
    PaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 1,
        backgroundColor: "#fff",
    },
    CarouselItem: {
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
    },
});
