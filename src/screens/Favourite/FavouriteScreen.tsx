import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { BaseLayout } from '@src/components';
import { UserList } from '@src/services';

import useFavourite from './useFavourite';

const FavouriteScreen = () => {
  const { styles, data, getImages, getIcons, onUnFavouritePress, contents } =
    useFavourite();

  const renderItem = ({ item }: { item: UserList }) => {
    return (
      <View key={item.id} style={styles.itemContainer}>
        {getImages(item.profileUrlLarge, {
          resizeMode: 'cover',
          style: styles.image,
        })}

        <View style={styles.userDetailContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.name}
            preset={'h4'}>
            {item.name}
          </Text>

          <Text
            preset={'h4'}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.email}>
            {item.email}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favIconContainer}
          onPress={() => onUnFavouritePress(item)}>
          {getIcons(Icons.FAV_ICON, {
            resizeMode: 'contain',
            style: styles.favIcon,
          })}
        </TouchableOpacity>
      </View>
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
        bounces={false}
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
