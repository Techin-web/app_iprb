import { Dimensions, StyleSheet } from 'react-native';
import defaultStyle from '../defaultStyle';


const styles = StyleSheet.create({
    ...defaultStyle,
    noHealthInsurances: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width
    },
    healthInsuranceTitle: {
        textAlign: 'center'
    }
});

export default styles;
