import type {
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
  BOTTOM_TAB_NAVIGATION = 'BOTTOM_TAB_NAVIGATION',
  HOME = 'HOME',
  FAVOURITE = 'FAVOURITE',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  SETTING = 'SETTING',
  NEWS_LIST = 'NEWS_LIST',
  NEWS_DETAIL = 'NEWS_DETAIL',
}

export type NavStackParams = {
  [Screen.NEWS_LIST]: undefined;
  [Screen.SETTING]: undefined;
  [Screen.NEWS_DETAIL]: NewsDetailParams;
  [Screen.BOTTOM_TAB_NAVIGATION]?: NavigatorScreenParams<BottomTabStackParamList>;
  [Screen.HOME]?: undefined;
  [Screen.FAVOURITE]?: undefined;
  [Screen.LOGIN_SCREEN]: undefined;
};

export type BottomTabStackParamList = {
  [Screen.HOME]?: undefined;
  [Screen.FAVOURITE]?: undefined;
};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type NewsDetailRoute = RouteProp<NavStackParams, Screen.NEWS_DETAIL>;
