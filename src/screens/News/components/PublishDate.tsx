import React from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import Icon from 'components/Icon';

interface IProps {
  date: string;
}

const PublishDate = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();

  return (
    <View style={styles.containerDate}>
      <Icon name={'calendar'} size={14} color={dynamicColors.LIGHTTextDisable} />
      <PaaveText style={styles.date} type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextDisable}>
        {props.date}
      </PaaveText>
    </View>
  );
};

const useStyles = getStylesHook({
  containerDate: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 8,
  },
});

export default withMemo(PublishDate);
