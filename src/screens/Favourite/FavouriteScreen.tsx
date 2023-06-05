import React from 'react';
import { FlatList, View } from 'react-native';

import { Text } from '@app/blueprints';

import { BaseLayout } from '@src/components';
import { UserList } from '@src/services';

import useFavourite from './useFavourite';
import { FavouriteView } from './views';

const FavouriteScreen = () => {
  const { styles, data, onUnFavouritePress, contents } = useFavourite();

  const renderItem = ({ item }: { item: UserList }) => {
    return (
      <FavouriteView item={item} onUnFavouritePress={onUnFavouritePress} />
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text preset="h2" style={styles.noFavouritesText}>
        {contents('favourites', 'noFavourites')}
      </Text>
    </View>
  );

  return (
    <BaseLayout>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatListStyles}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </BaseLayout>
  );
};

export default React.memo(FavouriteScreen);
