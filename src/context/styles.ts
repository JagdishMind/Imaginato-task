import { baseLayoutStyles, headerStyles } from '@src/components';
import { favouriteStyles } from '@src/screens/Favourite/Favourite.style';
import { homeStyles } from '@src/screens/Home/Home.style';
import { loginStyles } from '@src/screens/Login/Login.style';
import { Palette } from '@src/utils';

import { indicatorStyles } from '../../blueprints/Indicator';

export const defaultStyles = (theme: Palette) => {
  return {
    baseLayoutStyle: baseLayoutStyles(theme),
    favouriteStyles: favouriteStyles(theme),
    headerStyles: headerStyles(theme),
    homeStyles: homeStyles(theme),
    indicatorStyle: indicatorStyles(theme),
    loginStyle: loginStyles(theme),
  };
};
