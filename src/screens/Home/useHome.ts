import { useCallback, useEffect, useRef, useState } from 'react';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';

import { useAppContext } from '@src/context';
import { FavouritesList, UserList } from '@src/services';
import {
  clearCredentials,
  getFavouritesData,
  setFavouriteUser,
  useAppDispatch,
} from '@src/store';
import { isNetworkConnected } from '@src/utils';

const INITIAL_PAGE = 0;

const useHome = () => {
  const { styles, loader, getIcons, contents, getImages, services, ...props } =
    useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const shouldLoadMore = useRef(true);
  const currentPage = useRef<number>(0);
  const [data, setData] = useState<UserList[]>([]);
  const myFavourites: UserList[] = useSelector(getFavouritesData);

  const getUsers = useCallback(
    async (isPullToRefresh: boolean = false) => {
      const isConnected = await isNetworkConnected();
      if (!isConnected) {
        showToast(contents('common', 'internetConnectionError'), 'error');
        return;
      }
      if (
        !isPullToRefresh &&
        loader.current?.isLoading &&
        shouldLoadMore.current
      )
        return;
      loader.current?.show();
      currentPage.current += 1;
      await services
        .getUserList({ page: currentPage.current })
        .then(res => {
          if (res) {
            if (res.length === 0) {
              shouldLoadMore.current = false;
            } else {
              shouldLoadMore.current = true;
              setData(item => {
                return [...item, ...res];
              });
            }
          }
        })
        .catch(error => {
          showToast(error);
        })
        .finally(() => {
          setIsRefreshing(false);
          loader.current?.hide();
        });
    },
    [contents, loader, services]
  );

  const clearUsers = () => {
    currentPage.current = INITIAL_PAGE;
    shouldLoadMore.current = false;
    setData([]);
  };

  const onPullToRefresh = () => {
    setIsRefreshing(true);
    clearUsers();
    getUsers();
  };

  const onNextPage = () => {
    getUsers();
  };

  const onLogoutPress = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  const onUnFavouritePress = useCallback(
    (item: UserList) => {
      loader.current?.show();
      try {
        if (myFavourites && myFavourites.length > 0) {
          const newFavouritesList = myFavourites.filter(
            favItem => favItem.id !== item.id
          );
          dispatch(setFavouriteUser(newFavouritesList));
        }
      } catch (error) {
        showToast(contents('common', 'errorMessage'), 'error');
      } finally {
        loader.current?.hide();
      }
    },
    [loader, myFavourites, dispatch, contents]
  );

  const onFavouritePress = useCallback(
    (item: UserList) => {
      loader.current?.show();
      let favouriteUsers: FavouritesList[] = [];
      try {
        if (myFavourites && myFavourites.length > 0) {
          favouriteUsers = [...myFavourites, item];
        } else {
          favouriteUsers = [item];
        }
        dispatch(setFavouriteUser(favouriteUsers));
      } catch (error) {
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch, myFavourites, loader]
  );

  const isFavourite = useCallback(
    (id: string): boolean => {
      return (
        myFavourites &&
        myFavourites.length > 0 &&
        myFavourites.some(favItem => favItem.id === id)
      );
    },
    [myFavourites]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    contents,
    data,
    getIcons,
    getImages,
    isFavourite,
    isRefreshing,
    onFavouritePress,
    onLogoutPress,
    onNextPage,
    onPullToRefresh,
    onUnFavouritePress,
    shouldLoadMore: shouldLoadMore.current,
    styles: styles.homeStyles,
    ...props,
  };
};

export default useHome;
