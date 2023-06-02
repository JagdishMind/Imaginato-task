import React from 'react';

import { Button, Text, TextInputField } from '@app/blueprints';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Icons } from '@src/assets';
import { BaseLayout } from '@src/components';
import { scaled } from '@src/utils';

import useLogin from './useLogin';

const LoginScreen = () => {
  const {
    styles,
    contents,
    onToggleEyeIcon,
    isPassVisible,
    onLoginPress,
    getIcons,
    signInValidation,
    initialValues,
  } = useLogin();

  const eyeIcon = () => {
    return (
      <>
        {!isPassVisible
          ? getIcons(Icons.EYE_HIDE_ICON, {
              style: {
                ...scaled(22),
                tintColor: 'white',
              },
            })
          : getIcons(Icons.EYE_SHOW_ICON, {
              style: { ...scaled(22), tintColor: 'white' },
            })}
      </>
    );
  };

  return (
    <BaseLayout>
      <KeyboardAwareScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flexGrow}>
        <Text style={styles.titleStyles} preset="h1">
          {contents('login', 'loginAcc')}
        </Text>

        <Formik
          validationSchema={signInValidation}
          initialValues={initialValues}
          onSubmit={onLoginPress}>
          {({ handleSubmit }) => (
            <>
              <TextInputField
                title={contents('login', 'email')}
                placeholder={contents('login', 'email')}
                autoCapitalize="none"
                returnKeyType={'next'}
                inputMode={'email'}
                keyboardType="email-address"
                rootContainerStyle={styles.emailTextInput}
                id={'email'}
                name={'email'}
              />

              <TextInputField
                title={contents('login', 'password')}
                placeholder={contents('login', 'password')}
                rightIcon={eyeIcon()}
                autoCapitalize="none"
                returnKeyType={'done'}
                onRightIconPress={onToggleEyeIcon}
                secureTextEntry={isPassVisible}
                id={'password'}
                name={'password'}
                keyboardType="ascii-capable"
              />

              <Button
                title={contents('login', 'login')}
                containerStyle={styles.btnContainer}
                textStyle={styles.loginText}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </BaseLayout>
  );
};

export default React.memo(LoginScreen);
