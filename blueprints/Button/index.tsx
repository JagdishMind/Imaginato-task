import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { useAppContext } from '@src/context';
import { Palette, scaledSize, scaleHeight } from '@src/utils';

import { Text, TextPresets } from '../Text';

type ButtonPressableProps = Omit<PressableProps, 'style'>;

interface ButtonProps extends ButtonPressableProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textPreset?: TextPresets;
}

export const Button = React.memo(
  ({ title, containerStyle, textStyle, textPreset, ...props }: ButtonProps) => {
    const { color } = useAppContext();
    const styles = buttonStyle(color);

    return (
      <Pressable {...props} style={[styles.container, containerStyle]}>
        <Text
          preset={textPreset || 'h3'}
          style={[styles.buttonTitleStyle, textStyle]}>
          {title}
        </Text>
      </Pressable>
    );
  }
);

const buttonStyle = ({ white, primaryColor }: Palette) =>
  StyleSheet.create({
    buttonTitleStyle: {
      color: primaryColor,
      elevation: 12,
      marginVertical: scaleHeight(10),
      padding: scaleHeight(6),
    },
    container: {
      alignItems: 'center',
      backgroundColor: white,
      borderRadius: scaledSize(90),
      justifyContent: 'center',
    },
  });
