import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useAppContext } from '@src/context';
import { NewsResult } from '@src/services';
import { getNewsData as newsData, setNews, useAppDispatch } from '@src/store';

import { Screen } from '../../navigation/appNavigation.type';

const useNewsList = () => {
  const {
    navigation,
    styles,
    loader,
    getIcons,
    contents,
    getImages,
    services,
  } = useAppContext();
  const dispatch = useAppDispatch();

  const data = useSelector(newsData);

  const getNewsData = useCallback(async () => {
    loader.current?.show();
    const getNews = await services.getNews({ page: 1 });
    dispatch(setNews(getNews));
    loader.current?.hide();
  }, [dispatch, loader, services]);

  const handleNavigationNetwork = useCallback(() => {
    navigation.navigate(Screen.SETTING);
  }, [navigation]);

  const handleNavigationNewsItem = useCallback(
    (item: NewsResult) => () => {
      navigation.navigate(Screen.NEWS_DETAIL, {
        item,
      });
    },
    [navigation]
  );

  useEffect(() => {
    getNewsData();
  }, [data.length, getNewsData]);

  return {
    contents,
    data,
    getIcons,
    getImages,
    handleNavigationNetwork,
    handleNavigationNewsItem,
    styles: styles.newsListStyle,
  };
};

export default useNewsList;
