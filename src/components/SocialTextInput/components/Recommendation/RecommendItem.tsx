import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { KeywordConfig } from '../../types';
import BotUser from 'assets/icon/BotUser.svg';
import { scaleSize } from 'styles';
import { generateNameAbbreviations } from 'utils';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import config from 'config';
import ImagesLogo from 'components/ImagesLogo';
import { RecommendData, RecommendSymbol, RecommendTag, RecommendUser } from './types';
import { isRecommendTag, isRecommendUser } from './helpers';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';

interface RecommendItemProps {
  data: RecommendData;
  keywordConfig: React.MutableRefObject<KeywordConfig>;
}

export const RecommendItem = memo(({ data, keywordConfig }: RecommendItemProps) => {
  if (isRecommendUser(data)) {
    return <RecommendUserItem data={data} keywordConfig={keywordConfig} />;
  }
  if (isRecommendTag(data)) {
    return <RecommendTagItem data={data} keywordConfig={keywordConfig} />;
  }
  return <RecommendSymbolItem data={data} keywordConfig={keywordConfig} />;
});

interface RecommendUserProps extends RecommendItemProps {
  data: RecommendUser;
}

const RecommendUserItem = memo(({ data, keywordConfig }: RecommendUserProps) => {
  const { styles } = useStyles();

  const userAvatar = useUserAvatarColor(data.username);
  const isBot = data.username.includes('advisor');

  const onPress = () => {
    keywordConfig.current.MENTION?.onSuggestionPress?.({ id: data.username, name: data.fullname || data.username });
  };

  return (
    <TouchableOpacity style={styles.recommendContainer} onPress={onPress}>
      <View style={{ ...styles.avatarImg, backgroundColor: userAvatar ?? config.avatarColors[0] }}>
        {isBot ? (
          <BotUser width={scaleSize(40)} height={scaleSize(40)} />
        ) : (
          <Text allowFontScaling={false} style={styles.avatarImgText}>
            {generateNameAbbreviations(data.fullname)}
          </Text>
        )}
      </View>
      <View style={styles.itemContentContainer}>
        <Text allowFontScaling={false} style={styles.fullname}>
          {data.fullname}
        </Text>
        <Text allowFontScaling={false} style={styles.username}>
          {data.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

interface RecommendTagProps extends RecommendItemProps {
  data: RecommendTag;
}

const RecommendTagItem = memo(({ data, keywordConfig }: RecommendTagProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const tagName = data.tag;

  const onPress = () => {
    keywordConfig.current.TAG?.onSuggestionPress?.({ id: tagName, name: tagName });
  };

  return (
    <TouchableOpacity style={styles.recommendContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="hash" size={scaleSize(20)} />
      </View>
      <View style={styles.itemContentContainer}>
        <Text allowFontScaling={false} style={styles.symbolCode}>
          #{tagName}
        </Text>
        <Text allowFontScaling={false} style={styles.numberOfCode}>
          {data.count ?? 0} {t('Posts')} {t('in 7 days')}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

interface RecommendSymbolProps extends RecommendItemProps {
  data: RecommendSymbol;
}

const RecommendSymbolItem = memo(({ data, keywordConfig }: RecommendSymbolProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const symbolCode = data.symbol;

  const onPress = () => {
    keywordConfig.current.TAG?.onSuggestionPress?.({ id: symbolCode, name: symbolCode });
  };

  return (
    <TouchableOpacity style={styles.recommendContainer} onPress={onPress}>
      <ImagesLogo codeLogo={symbolCode} logoSize={40} logoStyle={styles.logoCode} />
      <View style={styles.itemContentContainer}>
        <Text allowFontScaling={false} style={styles.symbolCode}>
          {symbolCode}
        </Text>
        <Text allowFontScaling={false} style={styles.numberOfCode}>
          {data.count ?? 0} {t('Posts')} {t('in 7 days')}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
