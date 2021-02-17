import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "./routes";
import { responsiveWidth as rw } from "./util/Dimensions";
import { getToken } from "./services/auth-token";
import { ONESIGNAL_ID } from "./config/institution-metadata";
import OneSignal from "react-native-onesignal";
import API from "./services/axios-instance";

import logo from "./assets/logo.png";

class App extends Component {
    constructor(props) {
        super(props);

        OneSignal.init(ONESIGNAL_ID, {
            kOSSettingsKeyAutoPrompt: true,
        });
    }

    componentDidMount = async () => {
        try {
            const token = await getToken();
            await API.post("/verify/" + token);

            Navigation.setStackRoot(this.props.componentId, {
                component: {
                    name: navigationName.bottomTabs,
                },
            });
        } catch (err) {
            Navigation.setStackRoot(this.props.componentId, {
                component: {
                    name: navigationName.signIn,
                },
            });
        }
    };

    render() {
        return (
            <View style={styles.Container}>
                <Image source={logo} resizeMode="stretch" style={styles.Logo} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Logo: {
        height: rw("60%"),
        width: rw("60%"),
    },
});

App.options = {
    topBar: {
        visible: false,
    },
};

export default App;
