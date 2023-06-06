import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextInputProps as TextInputProperties,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Field } from 'formik';

import { Icons } from '@src/assets';
import { useAppContext } from '@src/context';
import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

import { presets, Text } from '../Text';

type TextInputPresets = keyof typeof presets;

interface TextFieldProps {
  title?: string;
  field: {
    name: string;
    onChange: any;
    onBlur: any;
    onFocus: any;
    value: string;
  };
  form: {
    errors: any;
    touched: any;
    setFieldTouched: any;
    setError: any;
    dirty: any;
  };
  id: string;
  rightIcon?: Icons;
  leftIcon?: Icons;
  name?: string;
  error?: string;
  textInputPreset?: TextInputPresets;
  onRightIconPress?: (() => void) | null;
  textInputStyle?: TextStyle;
  containerViewStyle?: StyleProp<ViewStyle>;
  rootContainerStyle?: StyleProp<ViewStyle>;
}

type TextInputProps = TextFieldProps & TextInputProperties;

type FieldTextInputProps = Omit<TextInputProps, 'form' | 'field'>;

export const TextInputField = (props: FieldTextInputProps) => {
  const { id, name, placeholder, ...inputProps } = props;

  return (
    <Field
      id={id}
      name={name}
      placeholder={placeholder}
      component={TextInput}
      {...inputProps}
    />
  );
};

const Input = (props: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const { color, getIcons } = useAppContext();
  const styles = textFieldStyles(color);
  const {
    rootContainerStyle,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched, dirty },
    rightIcon,
    leftIcon,
    onRightIconPress,
    textInputStyle,
    containerViewStyle,
    title,
    textInputPreset = 'h3',
    ...restProps
  } = props;

  const hasError = (errors[name] && touched[name]) || dirty[name];

  const [isActiveTextField, setIsActiveField] = useState<boolean>(false);

  return (
    <Pressable style={[styles.container, rootContainerStyle]}>
      {title ? (
        <Text preset="h4" style={styles.titleText}>
          {title}
        </Text>
      ) : null}
      <View
        style={[
          styles.containerView,
          isActiveTextField || value.length > 0 ? styles.activeFieldStyle : {},
          containerViewStyle,
        ]}>
        {leftIcon
          ? getIcons(leftIcon, {
              resizeMode: 'contain',
              style: [
                styles.leftIconStyle,
                isActiveTextField || value.length > 0
                  ? styles.activeIconTintColor
                  : styles.inActiveIconTintColor,
              ],
            })
          : null}
        <RNTextInput
          ref={ref}
          numberOfLines={1}
          placeholderTextColor={color.lightGray}
          selectionColor={
            isActiveTextField || value.length > 0
              ? color.primaryColor
              : color.lightGray
          }
          style={[presets[textInputPreset], styles.textInput, textInputStyle]}
          value={value}
          onChangeText={text => {
            if (name.toLowerCase().includes('password') && text.includes(' '))
              return onChange(name)(text.trim());
            return onChange(name)(text);
          }}
          onFocus={() => {
            setIsActiveField(true);
          }}
          onBlur={() => {
            setIsActiveField(false);
            setFieldTouched(name);
            onBlur(name);
          }}
          {...restProps}
        />
        {rightIcon ? (
          <Pressable onPress={onRightIconPress}>
            {getIcons(rightIcon, {
              resizeMode: 'contain',
              style: [
                styles.rightIconStyle,
                isActiveTextField || value.length > 0
                  ? styles.activeIconTintColor
                  : styles.inActiveIconTintColor,
              ],
            })}
          </Pressable>
        ) : null}
      </View>

      <Text preset="h5" style={styles.errorText}>
        {hasError ? errors[name] : ''}
      </Text>
    </Pressable>
  );
};

type InputRef = InstanceType<typeof RNTextInput>;
const TextInput = React.memo(React.forwardRef<InputRef, TextInputProps>(Input));

const textFieldStyles = ({
  white,
  black,
  red,
  lightGray,
  primaryColor,
}: Palette) => {
  const styles = StyleSheet.create({
    activeFieldStyle: {
      borderBottomColor: primaryColor,
    },
    activeIconTintColor: {
      tintColor: primaryColor,
    },
    container: {
      marginTop: scaleHeight(0),
    },
    containerView: {
      alignContent: 'center',
      alignItems: 'center',
      borderBottomColor: lightGray,
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: scaledSize(12),
    },
    errorText: {
      color: red,
      fontSize: scaledSize(10),
      marginStart: scaleWidth(2),
      marginTop: scaleHeight(4),
    },
    inActiveIconTintColor: {
      tintColor: lightGray,
    },
    leftIconStyle: {
      alignSelf: 'center',
      height: scaleHeight(18),
      marginRight: scaleWidth(10),
      width: scaleHeight(18),
    },
    rightIconStyle: {
      height: scaleHeight(18),
      marginLeft: scaleWidth(10),
      width: scaleHeight(18),
    },
    textInput: {
      alignSelf: 'center',
      color: black,
      flex: 1,
      fontSize: scaledSize(14),
      marginRight: scaleWidth(10),
      ...Platform.select({
        android: {
          marginTop: scaledSize(16),
          paddingTop: 0,
        },
        ios: {
          paddingVertical: scaledSize(16),
        },
      }),
    },
    titleText: { color: white, fontSize: scaledSize(16) },
  });
  return styles;
};
