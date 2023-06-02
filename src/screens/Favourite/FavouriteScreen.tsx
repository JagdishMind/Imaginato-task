import React from 'react';
import { View } from 'react-native';

import { Text } from '@app/blueprints';

import useFavourite from './useFavourite';

const FavouriteScreen = () => {
  const { styles } = useFavourite();

  return (
    <View style={styles.container}>
      <Text preset="h1">Favourite Screen</Text>
    </View>
  );
};

export default React.memo(FavouriteScreen);
