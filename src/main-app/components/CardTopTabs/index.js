import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import styles from "./styles";

export default function CardTopTabs(props) {
    return (
        <TouchableOpacity style={styles.Buttons} onPress={props.pressed}>
            <View style={styles.SecondaryIconHolder}>
                {props.secondaryIcon}
            </View>
            <View>{props.icon}</View>
            <Text style={styles.TextButtons}>{props.title}</Text>
        </TouchableOpacity>
    );
}
