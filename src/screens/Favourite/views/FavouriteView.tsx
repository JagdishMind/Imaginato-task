import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { useAppContext } from '@src/context';
import { UserList } from '@src/services';

interface FavouriteViewProps {
  item: UserList;
  onUnFavouritePress: (item: UserList) => void;
}

export const FavouriteView = ({
  item,
  onUnFavouritePress,
}: FavouriteViewProps) => {
  const {
    styles: { favouriteStyles: styles },
    getImages,
    getIcons,
  } = useAppContext();

  return (
    <View>
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
            preset={'h5'}>
            {item.name}
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
      <View style={styles.itemSeparator} />
    </View>
  );
};
