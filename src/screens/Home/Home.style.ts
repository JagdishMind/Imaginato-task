import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const homeStyles = ({ white, lightGray, borderColor }: Palette) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: scaleHeight(100),
      paddingHorizontal: scaleWidth(10),
    },
    date: { fontSize: scaledSize(13) },
    debugIcon: {
      ...scaled(22),
    },
    email: {
      color: lightGray,
    },
    favIcon: {
      ...scaled(22),
      tintColor: white,
    },
    favIconContainer: {
      padding: scaledSize(10),
    },
    flatListStyles: {
      marginTop: scaleHeight(10),
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: scaleHeight(10),
    },
    image: {
      borderRadius: scaledSize(50),
      height: scaleWidth(70),
      width: scaleWidth(70),
    },
    itemContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: scaleWidth(8),
      paddingVertical: scaleHeight(4),
    },
    itemSeparator: {
      backgroundColor: borderColor,
      height: 2,
      marginVertical: scaledSize(10),
      width: '100%',
    },
    logout: {
      ...scaled(25),
      transform: [{ rotate: '90deg' }],
    },
    name: {
      color: white,
    },
    networkButton: {
      position: 'absolute',
      right: scaleWidth(5),
      ...scaled(20),
    },
    userDetailContainer: {
      flex: 1,
      marginHorizontal: scaledSize(12),
    },
  });
