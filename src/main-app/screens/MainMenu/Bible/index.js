import React from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import axios from "../../../services/axios-instance";

import styles from "./styles";

class Bible extends React.Component {
    state = {
        bibleLink: null,
    };

    componentDidMount() {
        axios
            .get("/institutions")
            .then((res) => this.setState({ bibleLink: res.data.biblia }));
    }

    render() {
        const { bibleLink } = { ...this.state };

        let pageContent = <ActivityIndicator />;

        if (bibleLink) {
            pageContent = (
                <WebView
                    source={{ uri: bibleLink }}
                    style={styles.WebView}
                    originWhitelist={["*"]}
                />
            );
        }

        return pageContent;
    }
}

Bible.options = {
    topBar: {
        title: {
            text: "Bíblia",
        },
    },
};

export default Bible;
