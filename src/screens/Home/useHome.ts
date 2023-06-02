import { useAppContext } from '@src/context';

const useHome = () => {
  const { navigation, styles, ...props } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: styles.homeStyles,
    ...props,
  };
};

export default useHome;
