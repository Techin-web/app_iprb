import { StyleSheet } from 'react-native';

import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '../../util/Dimensions';

export default StyleSheet.create({
  Input: {
    backgroundColor: '#EDF5FF',
    borderColor: '#A9CEFF',
    color: '#9C9C9C',
    borderWidth: 1,
    width: '80%',
    fontSize: rw('4.2%'),
    fontWeight: '700',
    paddingVertical: rh('1.5%'),
    paddingHorizontal: rw('7%'),
    marginBottom: rh('3.5%'),
    borderRadius: 13,
  },
  DesneInput: {
    paddingVertical: rh('1%'),
    paddingHorizontal: rw('4%'),
    marginBottom: rh('2.5%'),
  },
});
