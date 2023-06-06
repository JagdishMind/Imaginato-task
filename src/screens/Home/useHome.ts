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
  const { styles, getIcons, contents, getImages, services, ...props } =
    useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFetching = useRef(false);
  const [isLoading, setLoading] = useState(isFetching.current);
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
      if (!isPullToRefresh && isFetching.current && shouldLoadMore.current)
        return;
      isFetching.current = true;
      setLoading(true);
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
          if (error && error !== null && error.length > 0) {
            showToast(error, 'error');
          }
        })
        .finally(() => {
          isFetching.current = false;
          setLoading(false);
          setIsRefreshing(false);
        });
    },
    [contents, isFetching, services]
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
      try {
        if (myFavourites && myFavourites.length > 0) {
          const newFavouritesList = myFavourites.filter(
            favItem => favItem.id !== item.id
          );
          dispatch(setFavouriteUser(newFavouritesList));
        }
      } catch (error) {
        showToast(contents('common', 'errorMessage'), 'error');
      }
    },
    [myFavourites, dispatch, contents]
  );

  const onFavouritePress = useCallback(
    (item: UserList) => {
      let favouriteUsers: FavouritesList[] = [];
      try {
        if (myFavourites && myFavourites.length > 0) {
          favouriteUsers = [...myFavourites, item];
        } else {
          favouriteUsers = [item];
        }
        dispatch(setFavouriteUser(favouriteUsers));
      } catch (error) {
        showToast(contents('common', 'errorMessage'), 'error');
      }
    },
    [contents, dispatch, myFavourites]
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
    isLoading,
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
