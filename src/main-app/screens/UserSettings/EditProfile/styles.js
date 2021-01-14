import { StyleSheet } from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '../../../util/Dimensions';

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ScrollView: {
    backgroundColor: '#FFF',
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: rh('5%'),
  },
  ButtonContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: rh('3%'),
    paddingTop: rh('1%'),
  },
  Title: {
    color: '#3752A6',
    textTransform: 'uppercase',
    fontSize: rw('4.5%'),
    fontWeight: '700',
    marginBottom: rh('2%'),
  },
});
