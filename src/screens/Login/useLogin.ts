import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { useAppContext } from '@src/context';
import {
  clearCredentials,
  error,
  useAppDispatch,
  validateCredentials,
} from '@src/store';
import { Pattern } from '@src/utils';

const useLogin = () => {
  const { navigation, styles, loader, contents, ...props } = useAppContext();

  const [isPassVisible, setIsPassVisible] = useState(true);

  const dispatch = useAppDispatch();

  const errorMessage = useSelector(error);

  useEffect(() => {
    if (errorMessage) {
      showToast(contents('login', 'invalidCred'), 'error');
      dispatch(clearCredentials());
    }
  }, [contents, dispatch, errorMessage]);

  const signInValidation = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(contents('login', 'requiredEmail'))
      .email(contents('login', 'emailInvalid'))
      .matches(Pattern.email, contents('login', 'emailInvalid')),
    password: yup
      .string()
      .trim()
      .required(contents('login', 'passwordRequired'))
      .min(6, contents('login', 'PasswordMinimumChar'))
      .max(20, contents('login', 'PasswordMaximumChar')),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onLoginPress = useCallback(
    (values: typeof initialValues) => {
      Keyboard.dismiss();
      loader.current?.show();
      try {
        dispatch(
          validateCredentials({
            email: values.email,
            password: values.password,
          })
        );
      } catch (e) {
        showToast(contents('common', 'errorMessage'), 'error');
      } finally {
        loader.current?.hide();
      }
    },
    [contents, dispatch, loader]
  );

  const onToggleEyeIcon = useCallback(
    () => setIsPassVisible(!isPassVisible),
    [isPassVisible]
  );

  return {
    contents,
    initialValues,
    isPassVisible,
    navigation,
    onLoginPress,
    onToggleEyeIcon,
    signInValidation,
    styles: styles.loginStyle,
    ...props,
  };
};

export default useLogin;
