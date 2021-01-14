import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16
    },
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4055B3',
        marginTop: 6,
        textAlign: 'center'
    },
    message: {
        fontSize: 20,
        color: '#4055B3',
        marginTop: 10,
        textAlign: 'center'
    },
    messageNoImage: {
        fontSize: 20,
        color: '#4055B3',
        marginTop: 120,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#5A74EB',
        marginTop: 26,
        justifyContent: 'center'
    },
    buttonPay: {
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 18
    }
});

export default styles;
