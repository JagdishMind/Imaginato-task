import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icons } from '@src/assets';
import { useAppContext } from '@src/context';

interface CustomHeaderProps {
  rightComponent?: JSX.Element;
  onRightComponentPress?: () => void;
}

export const Header = React.memo(
  ({
    rightComponent,
    onRightComponentPress: onRightComponentPress,
  }: CustomHeaderProps) => {
    const { styles: appStyles, getIcons } = useAppContext();
    const styles = appStyles.headerStyles;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainerStyle}>
          {getIcons(Icons.APP_LOGO, {
            resizeMode: 'contain',
            style: styles.loginIconStyle,
          })}
        </View>

        {!!rightComponent && (
          <TouchableOpacity
            onPress={onRightComponentPress}
            style={styles.backButtonContainer}>
            {rightComponent}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
