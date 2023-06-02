import { RootState } from '../index';

export const getUsersData = (state: RootState) => state.usersData.users;
