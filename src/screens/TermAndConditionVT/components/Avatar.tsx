import useUserAvatarColor from 'hooks/useUserAvatarColor';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { generateNameAbbreviations } from 'utils';
import { getStylesHook } from 'hooks/useStyles';

type AvatarProps = {
  username: string;
  fullName: string;
  isHideBorderNoData?: boolean;
  isFirst?: boolean;
};

const Avatar = ({ username, fullName, isHideBorderNoData, isFirst = false }: AvatarProps) => {
  const color = useUserAvatarColor(username);
  const { styles } = useStyles();

  return (
    <View
      style={[
        isHideBorderNoData ? {} : styles.avatarImg,
        !isFirst && styles.shiftLeft8,
        { backgroundColor: color ?? Colors.WHITE },
      ]}
    >
      <Text allowFontScaling={false} style={styles.avatarImgText}>
        {generateNameAbbreviations(fullName)}
      </Text>
    </View>
  );
};

export default memo(Avatar);

const useStyles = getStylesHook({
  shiftLeft8: {
    marginLeft: -8,
  },
  avatarImg: {
    ...globalStyles.centered,
    height: 36,
    width: 36,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.WHITE,

    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  avatarImgText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.WHITE,
  },
});
