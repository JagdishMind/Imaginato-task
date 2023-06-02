import React from 'react';
import {
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

import { isIOS } from '@src/constants';
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
  };
  id: string;
  rightIcon?: JSX.Element;
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
  const { color } = useAppContext();
  const styles = textFieldStyles(color);
  const {
    rootContainerStyle,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    rightIcon,
    onRightIconPress,
    textInputStyle,
    containerViewStyle,
    title,
    textInputPreset = 'h3',
    ...restProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <Pressable style={[styles.container, rootContainerStyle]}>
      {title ? (
        <Text preset="h4" style={styles.titleText}>
          {title}
        </Text>
      ) : null}
      <View style={[styles.containerView, containerViewStyle]}>
        <RNTextInput
          ref={ref}
          numberOfLines={1}
          placeholderTextColor={color.lightGray}
          style={[presets[textInputPreset], styles.textInput, textInputStyle]}
          value={value}
          onChangeText={text => {
            if (name.toLowerCase().includes('password') && text.includes(' '))
              return onChange(name)(text.trim());
            return onChange(name)(text);
          }}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...restProps}
        />
        {!!rightIcon && (
          <Pressable onPress={onRightIconPress}>{rightIcon}</Pressable>
        )}
      </View>

      <Text preset="h5" style={styles.errorText}>
        {hasError ? errors[name] : ''}
      </Text>
    </Pressable>
  );
};

type InputRef = InstanceType<typeof RNTextInput>;
const TextInput = React.memo(React.forwardRef<InputRef, TextInputProps>(Input));

const textFieldStyles = ({ white, red, lightGray }: Palette) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: scaleHeight(10),
    },
    containerView: {
      alignItems: 'center',
      borderColor: lightGray,
      borderRadius: scaledSize(8),
      borderWidth: 1,
      flexDirection: 'row',
      marginTop: scaleHeight(4),
      paddingHorizontal: scaledSize(12),
      paddingVertical: scaleHeight(isIOS ? 16 : 2),
    },
    errorText: {
      color: red,
      fontSize: scaledSize(14),
      marginStart: scaleWidth(2),
      marginTop: scaleHeight(8),
    },
    textInput: {
      color: white,
      flex: 1,
      fontSize: scaledSize(14),
      marginRight: scaleWidth(10),
    },
    titleText: { color: white, fontSize: scaledSize(16) },
  });
  return styles;
};
