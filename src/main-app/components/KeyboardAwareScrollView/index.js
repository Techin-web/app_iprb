import React from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";

import styles from "./styles";

export default function KeyboardAwareScrollViewComponent(props) {
    return Platform.OS === "ios" ? (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={false}
            scrollToPosition={{ x: 0, y: 0 }}
            style={[styles.Root, props.customStyles]}
        >
            <Container>{props.children}</Container>
        </KeyboardAwareScrollView>
    ) : (
        props.children
    );
}
