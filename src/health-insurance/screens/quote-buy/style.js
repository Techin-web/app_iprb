import { StyleSheet } from 'react-native';
import defaultStyle from '../defaultStyle';

const styles = StyleSheet.create({
    ...defaultStyle,
    alignIcon: {
        position: 'absolute',
        right: 0,
        fontSize: 35
    },
    button: {
        height: 100,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#4055B3',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.0
    },
    buttonSelected: {
        backgroundColor: '#4055B3'
    },
    text: {
        color: 'white'
    },
    buttonText: {
        ...defaultStyle.textBlue,
        flex: 0.7,
        flexWrap: 'wrap',
        textAlign: 'center'
    }
});

export default styles;
