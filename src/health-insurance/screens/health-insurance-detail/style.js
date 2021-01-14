import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        height: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#5A74EB',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.0
    },
    image: {
        height: 80,
        width: '60%',
        flex: 1,
        marginBottom: 20,
        marginLeft: '20%'
    },
    text: {
        color: 'white'
    }
});

export default styles;
