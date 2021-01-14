import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text } from "native-base";
import { responsiveWidth as rw } from "../../util/Dimensions";
import TopTabs from "../TopTabs";
import MainMenu from "../MainMenu";
import UserSettings from "../UserSettings";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";

import styles from "./styles";

const tabs = [
    {
        screen: MainMenu,
        iconName: "home",
    },
    {
        screen: TopTabs,
        iconName: "person",
    },
    {
        screen: UserSettings,
        iconName: "settings",
    },
];

class BottomTabs extends Component {
    render() {
        return (
            <Container>
                <Tabs
                    tabBarPosition="bottom"
                    locked
                    tabContainerStyle={styles.TabContainerStyle}
                    tabBarUnderlineStyle={styles.TabBarUnderlineStyle}
                >
                    {tabs.map((tab, index) => {
                        const Screen = tab.screen;
                        let headingStyle = styles.TabHeading;
                        let iconStyle;

                        if (Platform.OS === "android") {
                            switch (index) {
                                case 0:
                                    iconStyle =
                                        styles.LeftTabHeadingIconAndroid;
                                    break;
                                case 1:
                                    headingStyle = styles.MainTabHeadingAndroid;
                                    iconStyle = styles.MainIconAndroid;
                                    break;
                                case 2:
                                    iconStyle =
                                        styles.RightTabHeadingIconAndroid;
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            if (index === 1) {
                                headingStyle = styles.MainTabHeadingIOS;
                                iconStyle = styles.MainIconIOS;
                            }
                        }

                        return (
                            <Tab
                                key={tab.iconName}
                                heading={
                                    <TabHeading style={headingStyle}>
                                        {index !== 1 ? (
                                            <MaterialIcons
                                                name={tab.iconName}
                                                home
                                                style={iconStyle}
                                                size={rw("7%")}
                                                color="#000"
                                            />
                                        ) : (
                                            <Text style={styles.ServiceText}>
                                                Serviços
                                            </Text>
                                        )}
                                    </TabHeading>
                                }
                            >
                                <Screen componentId={this.props.componentId} />
                            </Tab>
                        );
                    })}
                </Tabs>
            </Container>
        );
    }
}

BottomTabs.options = {
    topBar: {
        visible: false,
    },
};

export default BottomTabs;
