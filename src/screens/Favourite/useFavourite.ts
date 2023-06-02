import { useAppContext } from '@src/context';

const useFavourite = () => {
  const { navigation, styles, ...props } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: styles.favouriteStyles,
    ...props,
  };
};

export default useFavourite;
