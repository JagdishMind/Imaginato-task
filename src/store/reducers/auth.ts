import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type loginData = {
  email: string;
  password: string;
  isLoggedIn?: boolean;
};

const initialState: loginData = {
  email: '',
  isLoggedIn: false,
  password: '',
};

const userCred = {
  email: 'reactnative@jetdevs.com',
  Password: 'jetdevs@123',
};

export const authSlice = createSlice({
  initialState,
  name: 'authData',
  reducers: {
    validateCredentials: (state, { payload }: PayloadAction<loginData>) => {
      state.isLoggedIn =
        payload.email === userCred.email &&
        payload.password === userCred.Password;
    },
  },
});

export const {
  reducer: authData,
  actions: { validateCredentials },
  name: authentication,
} = authSlice;
