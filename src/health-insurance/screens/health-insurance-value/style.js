import { StyleSheet } from 'react-native';
import defaultStyle from '../defaultStyle';

const styles = StyleSheet.create({
    ...defaultStyle,
    alignTextList: {
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        marginLeft: 0,
        paddingLeft: 35,
        paddingRight: 35
    },
    adjustWidth: {
        flex: 1
    },
    checkbox: {
        marginLeft: -10
    },
    removeBorderBottom: {
        borderBottomWidth: 0
    },
    list: {
        marginLeft: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    listText: {
        color: 'white'
    },
    listTextBold: {
        fontWeight: 'bold'
    },
    text: {
        color: '#4055B3',
        marginLeft: 15,
        marginTop: 2
    },
    valuesList: {
        backgroundColor: '#5A74EB',
        borderRadius: 5,
        height: '100%',
        marginTop: 20,
        // flex: 1
    }
});

export default styles;
