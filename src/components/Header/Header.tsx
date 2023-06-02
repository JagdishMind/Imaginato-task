import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useAppContext } from '@src/context';

import { Text } from '../../../blueprints/Text';

interface CustomHeaderProps {
  title: string;
  rightComponent?: JSX.Element;
  onRightComponentPress?: () => void;
}

export const Header = React.memo(
  ({
    title,
    rightComponent,
    onRightComponentPress: onRightComponentPress,
  }: CustomHeaderProps) => {
    const { styles: appStyles } = useAppContext();
    const styles = appStyles.headerStyles;

    return (
      <View style={styles.container}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'middle'}
          style={styles.title}
          preset={'title'}>
          {title}
        </Text>

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
