import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserList } from '@src/services';

type UserData = {
  users: UserList[];
};

const initialState: UserData = {
  users: [],
};

export const usersSlice = createSlice({
  initialState,
  name: 'usersData',
  reducers: {
    clearUsers: () => initialState,
    setUsers: (state, { payload }: PayloadAction<UserList[] | []>) => {
      state.users = payload;
    },
  },
});

export const {
  reducer: usersData,
  actions: { clearUsers, setUsers },
  name: usersList,
} = usersSlice;
