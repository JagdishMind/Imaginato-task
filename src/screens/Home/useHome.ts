import { useCallback, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import { useAppContext } from '@src/context';
import { UserList } from '@src/services';
import {
  getUsersData,
  setUsers,
  useAppDispatch,
  validateCredentials,
} from '@src/store';

import { showToast } from '../../../blueprints/Toast/Toast';

const useHome = () => {
  const { styles, loader, getIcons, contents, getImages, services, ...props } =
    useAppContext();
  const dispatch = useAppDispatch();
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const shouldLoadMore = useRef(true);
  const currentPage = useRef<number>(0);
  const data: UserList[] = useSelector(getUsersData);

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

  useEffect(() => {
    getUserList();
  }, [data.length, getUserList]);

  return {
    contents,
    data,
    getIcons,
    getImages,
    handlePagination,
    isPaginating,
    onLogoutPress,
    shouldLoadMore,
    styles: styles.homeStyles,
    ...props,
  };
};

export default useHome;
