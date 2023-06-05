import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavouritesList } from '@src/services';

type FavouriteUserData = {
  favourites: FavouritesList[];
};

const initialState: FavouriteUserData = {
  favourites: [],
};

export const favouriteUsersSlice = createSlice({
  initialState,
  name: 'favouriteUsersData',
  reducers: {
    clearFavourites: () => initialState,
    removeFavouriteUser: (
      state,
      { payload }: PayloadAction<FavouritesList[] | []>
    ) => {
      state.favourites = payload;
    },
    setFavouriteUser: (
      state,
      { payload }: PayloadAction<FavouritesList[] | []>
    ) => {
      state.favourites = payload;
    },
  },
});

export const {
  reducer: favouriteUsersData,
  actions: { clearFavourites, removeFavouriteUser, setFavouriteUser },
  name: favouritesList,
} = favouriteUsersSlice;
