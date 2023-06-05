import { useCallback } from 'react';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';

import { useAppContext } from '@src/context';
import { FavouritesList } from '@src/services';
import {
  getFavouritesData,
  setFavouriteUser,
  useAppDispatch,
} from '@src/store';

const useFavourite = () => {
  const { navigation, styles, loader, contents, ...props } = useAppContext();
  const dispatch = useAppDispatch();

  const favouritesList: FavouritesList[] = useSelector(getFavouritesData);

  const onUnFavouritePress = useCallback(
    (item: FavouritesList) => {
      loader.current?.show();
      try {
        if (favouritesList && favouritesList.length > 0) {
          const newFavouritesList = favouritesList.filter(
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
    [contents, dispatch, favouritesList, loader]
  );

  return {
    contents,
    data: favouritesList,
    navigation,
    onUnFavouritePress,
    styles: styles.favouriteStyles,
    ...props,
  };
};

export default useFavourite;
