import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import styles from "./styles";

export default function CustomButton(props) {
    const buttonStyles = [styles.Button];
    const textButtonStyles = [styles.TextButton];
    let leftIconHolder;

    if (props.dark) {
        buttonStyles.push(styles.DarkButton);
    }

    if (props.extremeLight) {
        buttonStyles.push(styles.ExtremeLightButton);
    }

    if (props.bold) {
        textButtonStyles.push(styles.BoldButtonText);
    }

    if (props.large) {
        buttonStyles.push(styles.LargeButton);
    }

    if (props.extraLarge) {
        buttonStyles.push(styles.ExtraLargeButton);
    }

    if (props.leftIcon) {
        leftIconHolder = (
            <View style={styles.LeftIconHolder}>{props.leftIcon}</View>
        );
    }

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            {leftIconHolder}
            <Text style={textButtonStyles}>{props.title}</Text>
        </TouchableOpacity>
    );
}
