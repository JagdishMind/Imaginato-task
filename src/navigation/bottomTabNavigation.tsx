import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@app/blueprints';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icons } from '@src/assets';
import { isIOS } from '@src/constants';
import { useAppContext } from '@src/context';
import { FavouriteScreen } from '@src/screens';
import Home from '@src/screens/Home/HomeScreen';
import { logger, Palette, scaled, scaleHeight, screenWidth } from '@src/utils';

import { BottomTabStackParamList, Screen } from './appNavigation.type';

const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

interface BottomNavTab {
  title: string;
  icon: JSX.Element;
}

const bottomScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
};

export const BottomTabNavigation = React.memo(() => {
  const { color } = useAppContext();
  const styles = bottomTabStyle(color);
  return (
    <BottomTab.Navigator
      tabBar={props => (
        <SafeAreaView edges={['bottom']} style={styles.safeAreaStyle}>
          <TabBar {...props} />
        </SafeAreaView>
      )}
      backBehavior="history"
      screenOptions={{
        ...bottomScreenOptions,
      }}>
      <BottomTab.Screen name={Screen.HOME} component={Home} />
      <BottomTab.Screen name={Screen.FAVOURITE} component={FavouriteScreen} />
    </BottomTab.Navigator>
  );
});

export const TabBar = React.memo((props: BottomTabBarProps) => {
  const { navigation, state } = props;
  const { color, contents, getIcons } = useAppContext();
  const styles = bottomTabStyle(color);
  const arrayBottomTabData: Array<BottomNavTab> = [
    {
      icon: getIcons(Icons.HOME_ICON, {
        resizeMode: 'contain',
        style: styles.tabBarIcon,
      }),
      title: contents('bottomTab', 'home'),
    },
    {
      icon: getIcons(Icons.FAV_ICON, {
        resizeMode: 'contain',
        style: styles.tabBarIcon,
      }),
      title: contents('bottomTab', 'favourite'),
    },
  ];
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          logger('tabPress');
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress',
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({merge: true, name: route.name});
            navigation.navigate(route.name);
          }
        };
        return (
          <Pressable
            key={`${route.name}-${index}-TabBar`}
            accessibilityRole="button"
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            style={[
              styles.tabBarItemStyle,
              isFocused ? styles.selectedTabBarItemStyle : {},
            ]}>
            <View style={styles.tabIcon}>
              {arrayBottomTabData[index]?.icon}
            </View>

            <Text
              style={styles.tabItemText}
              color={isFocused ? color.primaryColor : color.lightGray}>
              {arrayBottomTabData[index]?.title.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

const bottomTabStyle = ({ black, primaryColor, lightGray, white }: Palette) => {
  const styles = StyleSheet.create({
    safeAreaStyle: { backgroundColor: lightGray },
    selectedTabBarItemStyle: {
      borderTopColor: primaryColor,
    },
    tabBarContainer: {
      alignItems: 'center',
      backgroundColor: black,
      elevation: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: scaleHeight(isIOS ? 10 : 10),
    },
    tabBarIcon: { ...scaled(22), tintColor: white },
    tabBarItemStyle: {
      alignItems: 'center',
      backgroundColor: lightGray,
      borderColor: lightGray,
      borderTopWidth: scaleHeight(1.5),
      justifyContent: 'center',
      width: screenWidth / 2 - 2,
    },
    tabIcon: {
      marginBottom: scaleHeight(8),
      marginTop: scaleHeight(8),
    },
    tabItemText: {
      fontSize: scaleHeight(10),
    },
  });
  return styles;
};
