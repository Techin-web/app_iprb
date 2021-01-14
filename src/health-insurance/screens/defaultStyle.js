import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    primaryColor: {
        color: '#5A74EB'
    },
    primaryBackgroundColor: {
        backgroundColor: '#5A74EB'
    },
    primaryDarkColor: {
        color: '#4055B3'
    },
    primaryDarkBackgroundColor: {
        backgroundColor: '#4055B3'
    },
    buttonDisabled: {
        backgroundColor: 'silver'
    },
    loading: {
        flex: 1
    },
    container: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    contentContainer: {
        justifyContent: 'space-between',
        height: '100%'
    },
    content: {
        marginBottom: 16
    },
    row: {
        flexDirection: 'row'
    },
    footer: {
        elevation: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        position: 'relative'
    },
    footerButton: {
        backgroundColor: '#5A74EB',
        borderRadius: 5,
        justifyContent: 'center',
        flex: 1
    },
    footerButtonForm: {
        marginTop: 16,
        backgroundColor: '#5A74EB',
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 32
    },
    formError: {
        fontSize: 10,
        color: 'red'
    },
    textBlue: {
        color: '#4055B3'
    },
    divisor: {
        borderWidth: 2,
        borderColor: "rgba(90, 116, 235, 0.2)",
        borderRadius: 6,
        height: 8,
        marginTop: 15,
        marginBottom: 10,
        width: '100%'
    },
    select: {
        width: Dimensions.get('window').width - 16
    },
    selectMiddle: {
        width: (Dimensions.get('window').width / 2) - 10
    },
    noBorderBottom: {
        borderBottomWidth: 0
    }
});

export default styles;
