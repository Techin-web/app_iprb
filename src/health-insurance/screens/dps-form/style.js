import { StyleSheet } from 'react-native';
import defaultStyle from '../defaultStyle';

const styles = StyleSheet.create({
    ...defaultStyle,
    formTitle: {
        ...defaultStyle.primaryDarkColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemQuestion: {
        flexDirection: 'row',
        marginTop: 21
    },
    itemAnswer: {
        flexDirection: 'row',
        marginTop: 8
    },
    itemQuestionText: {
        fontSize: 15,
        color: '#4055B3',
        fontWeight: '300',
        marginLeft: 8
    },
    itemQuestionNumber: {
        fontSize: 15,
        color: '#4055B3',
        fontWeight: '500'
    },
    itemAnswerText: {
        marginLeft: 20,
        color: '#4055B3',
        fontWeight: '500'
    },
    rowSpacing: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5
    }
});

export default styles;
