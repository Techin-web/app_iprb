import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    WebView: {
        flex: 1,
    },
    ContainerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ModalContent: {
        width: '70%',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.2)',
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextLoading: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    }
});

export default styles;
