import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// resolution changes as per design

export const designWidth = 375;
export const designHeight = 812;

const scaleWidth = (val: number) => {
  return val;
};

const scaleHeight = (val: number) => {
  return val;
};

const moderateScale = (size: number, factor = 1) =>
  size + (scaleWidth(size) - size) * factor;

const scaledSize = (size: number) => size;

export {
  moderateScale,
  scaledSize,
  scaleHeight,
  scaleWidth,
  screenHeight,
  screenWidth,
};
