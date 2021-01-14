import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./styles";

export default function LoadingScreen(props) {
    return (
        <View style={styles.Container}>
            <ActivityIndicator color={props.indicatorColor} size="large" />
        </View>
    );
}
