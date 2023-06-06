import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const loginStyles = ({
  white,
  backgroundColor,
  primaryColor,
  black,
  lightGray,
}: Palette) =>
  StyleSheet.create({
    activeBtnContainer: {
      backgroundColor: primaryColor,
    },
    btnContainer: {
      backgroundColor: lightGray,
      borderRadius: scaledSize(8),
      marginTop: scaleHeight(40),
      paddingVertical: 0,
    },
    container: {
      backgroundColor: backgroundColor,
      flex: 1,
      paddingHorizontal: scaleWidth(18),
    },
    emailTextInput: {
      marginTop: scaleHeight(60),
    },
    eyeOffIcon: {
      ...scaled(38),
    },
    flexGrow: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
    },
    formContainerStyle: {
      backgroundColor: white,
      borderRadius: scaledSize(10),
      elevation: 1,
      height: '85%',
      padding: scaledSize(10),
      paddingHorizontal: scaledSize(16),
      shadowColor: black,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0.2,
      shadowRadius: scaledSize(2),
      width: '95%',
    },
    iconContainerStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: white,
      borderRadius: scaledSize(70),
      height: scaleHeight(70),
      justifyContent: 'center',
      marginTop: -scaleHeight(70) / 1.5,
      width: scaleHeight(70),
    },
    inActiveBtnContainer: {
      backgroundColor: lightGray,
    },
    loginIconStyle: {
      height: scaleHeight(45),
      width: scaleHeight(45),
    },
    loginText: {
      color: white,
      fontSize: scaledSize(16),
      marginVertical: scaleHeight(4),
    },
    passwordTextInput: {
      marginTop: scaledSize(4),
    },
    titleStyles: {
      alignSelf: 'center',
      color: black,
      fontWeight: '700',
      marginTop: scaleHeight(50),
    },
  });
