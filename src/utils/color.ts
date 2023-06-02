import { ColorSchemeName } from 'react-native/types';

export const color = {
  light: {
    backgroundColor: '#28282B',
    black: '#000000',
    errorBg: '#F4D2D2',
    lightGray: '#DDDDDD',
    primaryColor: 'red',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    secondaryColor: '#6c757d',
    textColor: '#343a40',
    textfieldBorderColor: '#EFEFEF',
    transparent: 'transparent',
    white: '#FAF9F6',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
