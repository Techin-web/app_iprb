import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    centerContent: {
        justifyContent: 'center'
    },
    button: {
        height: 180,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'column',
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
        width: 80
    },
    text: {
        color: 'white',
        marginTop: 20
    }
});

export default styles;
