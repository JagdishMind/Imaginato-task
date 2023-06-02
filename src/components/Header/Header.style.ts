import { StyleSheet } from 'react-native';

import { Palette, scaleHeight } from '../../utils';

export const headerStyles = ({ lightGray }: Palette) =>
  StyleSheet.create({
    backButtonContainer: {
      end: 0,
      padding: 10,
      position: 'absolute',
      zIndex: 1,
    },
    container: {
      alignItems: 'center',
      backgroundColor: lightGray,
      elevation: 4,
      flexDirection: 'row',
      height: scaleHeight(60),
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      width: '100%',
    },
    title: { textAlign: 'center', width: '100%' },
  });
