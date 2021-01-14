import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import axios from "../../../services/axios-instance";

import styles from "./styles";

class Hymns extends React.Component {
    state = {
        hymnsLink: null,
    };

    componentDidMount() {
        axios
            .get("/institutions")
            .then((res) => this.setState({ hymnsLink: res.data.hinario }));
    }

    render() {
        const { hymnsLink } = { ...this.state };

        let pageContent = <ActivityIndicator />;

        if (hymnsLink) {
            pageContent = (
                <WebView
                    source={{ uri: hymnsLink }}
                    style={styles.WebView}
                    originWhitelist={["*"]}
                />
            );
        }

        return pageContent;
    }
}

Hymns.options = {
    topBar: {
        title: {
            text: "Hinário",
        },
    },
};

export default Hymns;
