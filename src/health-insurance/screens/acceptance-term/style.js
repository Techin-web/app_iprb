import {
    Dimensions,
    StyleSheet
} from 'react-native';
import {
    defaultStyle
} from '../defaultStyle';

const styles = StyleSheet.create({
    ...defaultStyle,
    button: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#4055B3'
    },
    container: {
        padding: 20
    },
    content: {
        flex: 1
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 350
    },
    text: {
        color: '#4055B3',
        marginLeft: 15
    }
});

export default styles;
