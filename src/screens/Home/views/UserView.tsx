import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { useAppContext } from '@src/context';
import type { Extra, UserList } from '@src/services';

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
      <View style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          {getImages(item.profileUrlLarge, {
            resizeMode: 'cover',
            style: styles.image,
          })}
        </View>

        <View style={styles.itemMainContainer}>
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.userDetailContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.name}
                preset={'h3'}>
                {`${item.name}`}
              </Text>

              <View style={styles.locationContainer}>
                {getIcons(Icons.LOCATION, {
                  resizeMode: 'cover',
                  style: styles.locationIcon,
                })}
                <Text
                  preset={'h5'}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.location}>
                  {item.location}
                </Text>
              </View>

              <View style={styles.extraContainer}>
                {item.extras.map((extraItem: Extra, index: number) => {
                  return (
                    <View key={`${extraItem.tag}-${index}`}>
                      <Text
                        preset={'h5'}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[
                          styles.extraText,
                          {
                            backgroundColor: extraItem.bodyColor,
                            color: extraItem.textColor,
                          },
                        ]}>
                        {extraItem.tag}
                      </Text>
                    </View>
                  );
                })}
              </View>
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
        </View>
      </View>
    );
  }
);
