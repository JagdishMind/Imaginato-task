import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {
  NetworkLoggerScreen,
  NewsDetailScreen,
  NewsListScreen,
} from '@src/screens';

import { NavStackParams, Screen } from './appNavigation.type';
import { BottomTabNavigation } from './bottomTabNavigation';

const MainStack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  orientation: 'portrait',
};

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={Screen.BOTTOM_TAB_NAVIGATION}>
      <MainStack.Screen
        name={Screen.BOTTOM_TAB_NAVIGATION}
        options={{
          gestureEnabled: false,
        }}
        component={BottomTabNavigation}
      />
      <MainStack.Screen name={Screen.NEWS_LIST} component={NewsListScreen} />
      <MainStack.Screen
        name={Screen.NEWS_DETAIL}
        component={NewsDetailScreen}
      />
      {__DEV__ && (
        <MainStack.Screen
          name={Screen.SETTING}
          component={NetworkLoggerScreen}
        />
      )}
    </MainStack.Navigator>
  );
};
