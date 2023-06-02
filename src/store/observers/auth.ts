import { RootState } from '../index';

export const isLoggedIn = (state: RootState) => state.authData.isLoggedIn;
