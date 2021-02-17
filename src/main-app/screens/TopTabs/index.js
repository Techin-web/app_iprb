import React, { Component } from "react";
import { Container, Tab, Tabs, TabHeading, Text, View } from "native-base";
import { BR_MONTH } from "../../util/Month";
import SerialCard from "./SerialCard";
import Products from "./Products";
import Awards from "./Awards";
import API from "../../services/axios-instance";

import styles from "./styles";

const tabs = [
    // {
    //     screen: SerialCard,
    //     label: "Cartão",
    // },
    {
        screen: Products,
        label: "Produtos",
    },
    {
        screen: Awards,
        label: "Premiação",
    },
];

class TopTabs extends Component {
    render() {
        const renderedTabs = tabs.map((tab) => {
            const Screen = tab.screen;

            return (
                <Tab
                    key={tab.label}
                    heading={
                        <TabHeading style={styles.TabHeading}>
                            <Text style={styles.TabText}>{tab.label}</Text>
                        </TabHeading>
                    }
                >
                    <Screen componentId={this.props.componentId} />
                </Tab>
            );
        });

        return (
            <Container>
                <Tabs
                    tabContainerStyle={styles.TabsContainer}
                    tabBarUnderlineStyle={styles.TabBarUnderline}
                >
                    {renderedTabs}
                </Tabs>
            </Container>
        );
    }
}

TopTabs.options = {
    topBar: {
        visible: false,
    },
};

export default TopTabs;
