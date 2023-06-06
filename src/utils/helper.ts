import NetInfo from '@react-native-community/netinfo';

import { scaledSize } from './dimensions';

export const isNetworkConnected = async () => {
  const state = await NetInfo.refresh();
  return state.isConnected || false;
};

export const Pattern = {
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
} as const;

export const logger = (prefix?: any) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`${String(prefix)}`, prefix);
  }
};

export const scaled = (value: number) => {
  return {
    height: scaledSize(value),
    width: scaledSize(value),
  };
};

export function getRandomColor(opacity?: number) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (opacity) {
    return color + opacity?.toString;
  } else {
    return color;
  }
}
