import { StyleSheet } from 'react-native';

import { isIOS } from '@src/constants';
import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const loginStyles = ({ white, black }: Palette) =>
  StyleSheet.create({
    btnContainer: {
      borderRadius: scaledSize(8),
      marginTop: scaleHeight(40),
      paddingVertical: 0,
    },
    container: {
      flex: 1,
      marginTop: scaleHeight(140),
      paddingHorizontal: scaleWidth(18),
    },
    emailTextInput: {
      marginTop: scaleHeight(30),
    },
    eyeOffIcon: {
      ...scaled(38),
    },
    flexGrow: {
      flexGrow: 1,
    },
    loginText: {
      color: black,
      paddingVertical: !isIOS ? 0 : undefined,
    },
    titleStyles: {
      alignSelf: 'center',
      color: white,
      marginTop: scaleHeight(50),
    },
  });
