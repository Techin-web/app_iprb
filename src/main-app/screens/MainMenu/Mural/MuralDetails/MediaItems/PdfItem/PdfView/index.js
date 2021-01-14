import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import Pdf from "react-native-pdf";

export default function PDFExample(props) {
    const source = {
        uri: props.pdfUri,
        cache: false,
    };

    return (
        <View style={styles.container}>
            <Pdf source={source} style={styles.pdf} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    pdf: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
