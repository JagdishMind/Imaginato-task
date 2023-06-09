import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
  screenHeight,
} from '@src/utils';

export const favouriteStyles = ({
  white,
  black,
  borderColor,
  primaryColor,
}: Palette) =>
  StyleSheet.create({
    bodyContainer: {
      backgroundColor: white,
      flex: 1,
      marginTop: 1,
    },
    contentContainer: {
      paddingBottom: scaleHeight(100),
    },
    emptyContainer: {
      alignItems: 'center',
      height: screenHeight - scaleHeight(100),
      justifyContent: 'center',
    },
    favIcon: {
      ...scaled(28),
      tintColor: primaryColor,
    },
    favIconContainer: {
      padding: scaledSize(10),
    },
    flatListStyles: {
      paddingTop: scaleHeight(10),
    },
    image: {
      borderRadius: scaledSize(45),
      height: scaleWidth(45),
      tintColor: primaryColor,
      width: scaleWidth(45),
    },
    itemContainer: {
      alignItems: 'center',
      backgroundColor: white,
      flex: 1,
      flexDirection: 'row',
      marginVertical: scaleWidth(4),
      paddingHorizontal: scaleWidth(16),
      paddingVertical: scaleHeight(4),
    },
    itemSeparator: {
      backgroundColor: borderColor,
      height: 1,
      width: '100%',
    },
    name: {
      color: black,
      fontSize: scaledSize(16),
    },
    noFavouritesText: {
      color: black,
      textAlign: 'center',
    },
    userDetailContainer: {
      flex: 1,
      marginHorizontal: scaledSize(12),
    },
  });
