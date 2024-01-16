import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { scaleSize, lightColors } from 'styles';
import { useTranslation } from 'react-i18next';

type IntroductionProps = {
  extended: boolean;
  bio: string | undefined;
  setExtendedVisible: (value: boolean) => void;
};

const Avatar = ({ extended, bio, setExtendedVisible }: IntroductionProps) => {
  const { t } = useTranslation();

  const getBioComponentHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    height < scaleSize(104) ? setExtendedVisible(false) : setExtendedVisible(true);
  };
  const { styles } = useStyles();
  return (
    <View style={[styles.basicInfoAreaDefault, !extended && styles.basicInfoArea]}>
      <View style={styles.userIntroContainer}>
        <Text allowFontScaling={false} style={styles.userIntroText}>
          {t('User Introduction')}
        </Text>
      </View>

      <View onLayout={getBioComponentHeight}>
        {!bio ? (
          <Text allowFontScaling={false} style={styles.textNoBio}>
            {t('No bio')}
          </Text>
        ) : (
          <Text allowFontScaling={false} style={styles.introText}>
            {bio}
          </Text>
        )}
      </View>
    </View>
  );
};

const useStyles = getStylesHook({
  basicInfoAreaDefault: {
    paddingTop: 8,
    paddingHorizontal: 16,
    width: 375,
  },
  basicInfoArea: {
    maxHeight: 126,
    overflow: 'hidden',
  },
  userIntroContainer: {
    flexDirectionRow: 'row',
    width: 343,
    height: 18,
    marginBottom: 10,
    justifyContent: 'center',
  },
  userIntroText: {
    flex: 1,
    fontWeight: '700',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
  },
  textNoBio: {
    color: lightColors.LIGHTTextTitle,
    marginBottom: 10,
    fontSize: 14,
  },
  introText: {
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 22,
    width: 343,
  },
});

export default withMemo(Avatar);
