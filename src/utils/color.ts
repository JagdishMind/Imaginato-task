import { ColorSchemeName } from 'react-native/types';

export const color = {
  light: {
    backgroundColor: '#E8E8E8',
    black: '#000000',
    borderColor: '#E5E4E2',
    darkGrey: '#757A79',
    errorBg: '#F4D2D2',
    lightGray: '#C0C0C0',
    primaryColor: '#FF1493',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    tabColor: '#FAF9F6',
    textColor: '#EFEFEF',
    transparent: 'transparent',
    white: '#FAF9F6',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
