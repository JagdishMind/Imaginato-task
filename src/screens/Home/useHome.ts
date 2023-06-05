import { useCallback, useEffect, useRef, useState } from 'react';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';

import { useAppContext } from '@src/context';
import { FavouritesList, UserList } from '@src/services';
import {
  getFavouritesData,
  getUsersData,
  setFavouriteUser,
  setUsers,
  useAppDispatch,
  validateCredentials,
} from '@src/store';

const useHome = () => {
  const { styles, loader, getIcons, contents, getImages, services, ...props } =
    useAppContext();
  const dispatch = useAppDispatch();
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const shouldLoadMore = useRef(true);
  const currentPage = useRef<number>(0);
  const data: UserList[] = useSelector(getUsersData);
  const favouritesList: UserList[] = useSelector(getFavouritesData);

  const getUserList = useCallback(async () => {
    if (shouldLoadMore.current) {
      loader.current?.show();
      currentPage.current += 1;

      currentPage.current === 1
        ? setIsPaginating(false)
        : setIsPaginating(true);

      await services
        .getUserList({ page: currentPage.current })
        .then(res => {
          if (res) {
            if (res.length === 0) {
              shouldLoadMore.current = false;
            }
            if (data.length > 0) {
              const concatUsers = [...data, ...res];
              dispatch(setUsers(concatUsers));
            } else {
              dispatch(setUsers(res));
            }
          }
        })
        .catch(error => {
          showToast(error);
        })
        .finally(() => loader.current?.hide());
    }
  }, [data, dispatch, loader, services]);

  const handlePagination = () => {
    if (isPaginating) return;
    getUserList();
  };

  const onLogoutPress = useCallback(() => {
    dispatch(
      validateCredentials({
        email: ' ',
        isLoggedIn: false,
        password: '',
      })
    );
  }, [dispatch]);

  const onUnFavouritePress = useCallback(
    (item: UserList) => {
      loader.current?.show();
      try {
        if (favouritesList && favouritesList.length > 0) {
          const newFavouritesList = favouritesList.filter(
            favItem => favItem.id !== item.id
          );
          dispatch(setFavouriteUser(newFavouritesList));
        }
      } catch (error) {
        showToast('Something went wrong, Please try later', 'error');
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch, favouritesList, loader]
  );

  const onFavouritePress = useCallback(
    (item: UserList) => {
      loader.current?.show();
      let favouriteUsers: FavouritesList[] = [];
      try {
        if (favouritesList && favouritesList.length > 0) {
          favouriteUsers = [...favouritesList, item];
        } else {
          favouriteUsers = [item];
        }
        dispatch(setFavouriteUser(favouriteUsers));
      } catch (error) {
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch, favouritesList, loader]
  );

  const isFavourite = useCallback(
    (id: string): boolean => {
      return (
        favouritesList &&
        favouritesList.length > 0 &&
        favouritesList.some(favItem => favItem.id === id)
      );
    },
    [favouritesList]
  );

  useEffect(() => {
    getUserList();
  }, [data.length, getUserList]);

  return {
    contents,
    data,
    getIcons,
    getImages,
    handlePagination,
    isFavourite,
    isPaginating,
    onFavouritePress,
    onLogoutPress,
    onUnFavouritePress,
    shouldLoadMore,
    styles: styles.homeStyles,
    ...props,
  };
};

export default useHome;
