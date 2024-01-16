import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';
import { IAccountData } from 'reduxs';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';

interface IProps {
  item: IAccountData;
}

const AccountItem = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { item } = props;
  return (
    <TouchableOpacity style={styles.container} disabled={true}>
      <Image source={{ uri: item.avatarStatic }} style={styles.image} resizeMode="contain" />
      <View>
        <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.MainBlue}>
          {item.displayName || item.userName}
        </PaaveText>
        <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.TextDescription}>
          {'@' + item.userName}
        </PaaveText>
      </View>
    </TouchableOpacity>
  );
};

export default withMemo(AccountItem);
