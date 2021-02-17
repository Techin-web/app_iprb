import React, { useState } from "react";
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, Modal, Text } from 'react-native';

import styles from './styles';

const CarteiraDigital = ({ url }) => {
    const [isWebViewLoading, setIsWebViewLoading] = useState(true);

    return (
        <>
            <Modal animationType="fade" transparent={true} visible={isWebViewLoading}>
                <View style={styles.ContainerModal}>
                    <View style={styles.ModalContent}>
                        <ActivityIndicator color="#3F5EBE" size="large" />
                        <Text style={styles.TextLoading}>carregando...</Text>
                    </View>
                </View>
            </Modal>
            <WebView
                originWhitelist={['*']}
                source={{uri: url}}
                onLoadEnd={() => setIsWebViewLoading(false)}
                style={styles.WebView}
            />
        </>
    );
}

CarteiraDigital.options = {
    topBar: {
        title: {
            text: "Carteira Digital",
        },
    },
};

export default CarteiraDigital;
