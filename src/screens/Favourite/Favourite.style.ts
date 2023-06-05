import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
  screenHeight,
} from '@src/utils';

export const favouriteStyles = ({ white, lightGray, borderColor }: Palette) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: scaleHeight(100),
      paddingHorizontal: scaleWidth(10),
    },
    email: {
      color: lightGray,
    },
    emptyContainer: {
      alignItems: 'center',
      height: screenHeight - scaleHeight(100),
      justifyContent: 'center',
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
    name: {
      color: white,
    },
    noFavouritesText: {
      color: white,
      textAlign: 'center',
    },
    userDetailContainer: {
      flex: 1,
      marginHorizontal: scaledSize(12),
    },
  });
