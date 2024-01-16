import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import { SearchedTag } from '../type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type TagItemProps = {
  data: SearchedTag;
};

export const TagItem = memo(({ data }: TagItemProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const onPress = () => {
    navigate({
      key: ScreenNames.SocialSearchHashtag,
      params: {
        data,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.recommendContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="hash" size={scaleSize(20)} />
      </View>
      <View style={styles.itemContentContainer}>
        <Text allowFontScaling={false} style={styles.hashtag}>
          #{data.name}
        </Text>
        <Text allowFontScaling={false} style={styles.numberOfCode}>
          {data.count ?? 0} {t('Posts')} {t('in 7 days')}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
