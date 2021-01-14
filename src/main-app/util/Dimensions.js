import { Dimensions } from 'react-native';

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const responsiveWidth = function(widthString) {
  const widthPercent = widthString.split('%')[0];
  return ww * (widthPercent / 100);
};

const responsiveHeight = function(heightString) {
  const heightPercent = heightString.split('%')[0];
  return wh * (heightPercent / 100);
};

export { ww, wh, responsiveHeight, responsiveWidth };
