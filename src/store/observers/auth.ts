import { RootState } from '../index';

export const isLoggedIn = (state: RootState) => state.authData.isLoggedIn;

export const error = (state: RootState) => state.authData.errorMessage;
