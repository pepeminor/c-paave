import { View, Text } from 'react-native';
import React, { memo, useMemo } from 'react';
import withMemo from 'HOC/withMemo';
import { useStyles } from './styles';

type Props = {
  rank: number;
};

const RankingBlock = ({ rank }: Props) => {
  const { styles } = useStyles();
  const subContainerStyle = useMemo(
    () => [
      styles.subContainer,
      rank === 1 && styles.backgroundRank1,
      rank === 2 && styles.backgroundRank2,
      rank === 3 && styles.backgroundRank3,
      rank > 3 && styles.backgroundRank4,
    ],
    [styles, rank]
  );
  return (
    <View style={styles.container}>
      <View style={subContainerStyle}>
        <Icon inverse={rank > 3} />
        <Text allowFontScaling={false} style={rank > 3 ? styles.textInverse : styles.text}>
          {rank}
        </Text>
      </View>
    </View>
  );
};

export default withMemo(RankingBlock);

const Icon = memo(({ inverse }: { inverse: boolean }) => {
  const { styles } = useStyles();
  return (
    <View style={styles.iconContainer}>
      <View style={inverse ? styles.block1Inverse : styles.block1} />
      <View style={inverse ? styles.block2Inverse : styles.block2} />
      <View style={inverse ? styles.block3Inverse : styles.block3} />
    </View>
  );
});
