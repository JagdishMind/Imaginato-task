import React from 'react';

import { useSelector } from 'react-redux';

import { isLoggedIn } from '@src/store';

import { AuthStackNavigation } from './AuthStackNavigation';
import { MainStackNavigation } from './MainStackNavigation';

export const AppNavigation = () => {
  const isUserLoggedIn = useSelector(isLoggedIn);
  return (
    <>{isUserLoggedIn ? <MainStackNavigation /> : <AuthStackNavigation />}</>
  );
};
