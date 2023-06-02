import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { BaseLayout, Header } from '@src/components';
import type { UserList } from '@src/services';

import useHome from './useHome';

const HomeScreen = () => {
  const {
    styles,
    data,
    getIcons,
    getImages,
    onLogoutPress,
    handlePagination,
    shouldLoadMore,
    isPaginating,
  } = useHome();
  const isFavourite = true;

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

        {!isFavourite ? (
          <TouchableOpacity>
            {getIcons(Icons.FAV_ICON, {
              resizeMode: 'contain',
              style: styles.favIcon,
            })}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            {getIcons(Icons.FAV_OUTLINE_ICON, {
              resizeMode: 'contain',
              style: styles.favIcon,
            })}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <BaseLayout>
      <Header
        title="Users-List"
        rightComponent={getIcons(Icons.LOGOUT_ICON, {
          resizeMode: 'contain',
          style: styles.logout,
        })}
        onRightComponentPress={onLogoutPress}
      />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatListStyles}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={shouldLoadMore ? handlePagination : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return <>{isPaginating ? <ActivityIndicator /> : null}</>;
        }}
      />
    </BaseLayout>
  );
};
export default React.memo(HomeScreen);
