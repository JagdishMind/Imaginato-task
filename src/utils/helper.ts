import NetInfo from '@react-native-community/netinfo';

import { scaledSize } from './dimensions';

export const isNetworkConnected = async () => {
  const state = await NetInfo.refresh();
  return state.isConnected || false;
};

export const Pattern = {
  lowercasePasswordRegex: /w*[a-z]w*/,
  numPasswordRegex: /\d/,
  specialCharPasswordRegex: /[!@#$%^&*()\-_"=+{}; :,<.>]/,
  uppercasePasswordRegex: /\w*[A-Z]\w*/,
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
