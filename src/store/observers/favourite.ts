import { RootState } from '../index';

export const getFavouritesData = (state: RootState) =>
  state.favouriteUsersData.favourites;
