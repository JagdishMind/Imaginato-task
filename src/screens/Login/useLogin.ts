import { useCallback, useState } from 'react';

import * as yup from 'yup';

import { useAppContext } from '@src/context';
import { useAppDispatch, validateCredentials } from '@src/store';
import { Pattern } from '@src/utils';

const useLogin = () => {
  const { navigation, styles, loader, contents, ...props } = useAppContext();

  const [isPassVisible, setIsPassVisible] = useState(true);

  const dispatch = useAppDispatch();

  const signInValidation = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(contents('login', 'emailInvalid'))
      .required(contents('login', 'emailEmptyVal')),
    password: yup
      .string()
      .trim()
      .required(contents('login', 'passwordRequired'))
      .matches(
        Pattern.lowercasePasswordRegex,
        contents('login', 'passwordValidSmall')
      )
      .matches(
        Pattern.numPasswordRegex,
        contents('login', 'passwordValidNumber')
      )
      .matches(
        Pattern.specialCharPasswordRegex,
        contents('login', 'passwordValidSpecialChar')
      )
      .min(8, contents('login', 'PasswordMinimumChar'))
      .max(20, contents('login', 'PasswordMaximumChar')),
  });

  const initialValues = {
    email: 'reactnative@jetdevs.com',
    password: '',
  };

  const onLoginPress = useCallback(
    (values: typeof initialValues) => {
      loader.current?.show();
      try {
        dispatch(
          validateCredentials({
            email: values.email,
            password: values.password,
          })
        );
        // navigation.navigate(Screen.HOME);
      } catch (error) {
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch, loader]
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
