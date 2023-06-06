import React from 'react';
import { View } from 'react-native';

import { Button, Text, TextInputField } from '@app/blueprints';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Icons } from '@src/assets';
import { BaseLayout } from '@src/components';

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

  return (
    <BaseLayout>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flexGrow}>
        <View style={styles.formContainerStyle}>
          <View style={styles.iconContainerStyle}>
            {getIcons(Icons.APP_LOGO, {
              resizeMode: 'contain',
              style: styles.loginIconStyle,
            })}
          </View>

          <Text style={styles.titleStyles} preset="h1">
            {contents('login', 'loginAcc')}
          </Text>

          <Formik
            validationSchema={signInValidation}
            initialValues={initialValues}
            validateOnMount={true}
            validateOnChange={true}
            onSubmit={onLoginPress}>
            {({ handleSubmit, isValid }) => (
              <View>
                <TextInputField
                  placeholder={contents('login', 'email')}
                  autoCapitalize="none"
                  returnKeyType={'next'}
                  inputMode={'email'}
                  keyboardType="email-address"
                  rootContainerStyle={[styles.emailTextInput]}
                  id={'email'}
                  leftIcon={Icons.EMAIL_LOGO}
                  name={'email'}
                />
                <TextInputField
                  placeholder={contents('login', 'password')}
                  autoCapitalize="none"
                  returnKeyType={'done'}
                  rootContainerStyle={styles.passwordTextInput}
                  leftIcon={Icons.LOCK_ICON}
                  rightIcon={
                    isPassVisible ? Icons.EYE_SHOW_ICON : Icons.EYE_HIDE_ICON
                  }
                  onRightIconPress={onToggleEyeIcon}
                  secureTextEntry={isPassVisible}
                  id={'password'}
                  name={'password'}
                  keyboardType="ascii-capable"
                />

                <Button
                  title={contents('login', 'login')}
                  containerStyle={[
                    styles.btnContainer,
                    isValid
                      ? styles.activeBtnContainer
                      : styles.inActiveBtnContainer,
                  ]}
                  textStyle={styles.loginText}
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </BaseLayout>
  );
};

export default React.memo(LoginScreen);
