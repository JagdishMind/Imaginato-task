import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { Icons } from '@src/assets';
import { BaseLayout, Header } from '@src/components';
import type { UserList } from '@src/services';

import useHome from './useHome';
import { UserView } from './views';

const HomeScreen = () => {
  const {
    styles,
    data,
    getIcons,
    onLogoutPress,
    onNextPage,
    onPullToRefresh,
    isRefreshing,
    onFavouritePress,
    isFavourite,
    onUnFavouritePress,
    contents,
    color,
  } = useHome();

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderItem = ({ item }: { item: UserList }) => {
    return (
      <UserView
        item={item}
        onUnFavouritePress={onUnFavouritePress}
        onFavouritePress={onFavouritePress}
        isFavourite={isFavourite(item.id)}
      />
    );
  };

  return (
    <BaseLayout>
      <Header
        title={contents('home', 'title')}
        rightComponent={getIcons(Icons.LOGOUT_ICON, {
          resizeMode: 'contain',
          style: styles.logout,
        })}
        onRightComponentPress={onLogoutPress}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatListStyles}
        keyExtractor={(item, index) => item.email + `-` + index}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        onEndReached={onNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            onRefresh={onPullToRefresh}
            refreshing={isRefreshing}
            tintColor={color.white}
          />
        }
      />
    </BaseLayout>
  );
};
export default React.memo(HomeScreen);
