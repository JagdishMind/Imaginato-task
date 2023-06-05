import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Screen {
  BOTTOM_TAB_NAVIGATION = 'BOTTOM_TAB_NAVIGATION',
  HOME = 'HOME',
  FAVOURITE = 'FAVOURITE',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}

export type NavStackParams = {
  [Screen.BOTTOM_TAB_NAVIGATION]?: NavigatorScreenParams<BottomTabStackParamList>;
  [Screen.HOME]?: undefined;
  [Screen.FAVOURITE]?: undefined;
  [Screen.LOGIN_SCREEN]: undefined;
};

export type BottomTabStackParamList = {
  [Screen.HOME]?: undefined;
  [Screen.FAVOURITE]?: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;
