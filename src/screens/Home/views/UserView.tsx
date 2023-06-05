import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { useAppContext } from '@src/context';
import type { UserList } from '@src/services';

interface UserViewProps {
  item: UserList;
  onUnFavouritePress: (item: UserList) => void;
  onFavouritePress: (item: UserList) => void;
  isFavourite: boolean;
}

export const UserView = React.memo(
  ({
    item,
    onUnFavouritePress,
    onFavouritePress,
    isFavourite,
  }: UserViewProps) => {
    const {
      styles: { homeStyles: styles },
      getIcons,
      getImages,
    } = useAppContext();

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
            {`${item.name}`}
          </Text>

          <Text
            preset={'h4'}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.email}>
            {item.email}
          </Text>
        </View>

        {isFavourite ? (
          <TouchableOpacity
            style={styles.favIconContainer}
            onPress={() => onUnFavouritePress(item)}>
            {getIcons(Icons.FAV_ICON, {
              resizeMode: 'contain',
              style: styles.favIcon,
            })}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.favIconContainer}
            onPress={() => onFavouritePress(item)}>
            {getIcons(Icons.FAV_OUTLINE_ICON, {
              resizeMode: 'contain',
              style: styles.favIcon,
            })}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
