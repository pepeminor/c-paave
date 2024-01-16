import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';
import StarRating from 'react-native-star-rating-widget';
import { scaleSize } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

interface IProps {
  pointValue: React.MutableRefObject<number>;
}

const StarVote = (props: IProps) => {
  const { styles } = useStyles();
  const [point, setPoint] = useState<number>(5);

  const onChangePoint = useCallback((value: number) => {
    setPoint(value);
    props.pointValue.current = value * 2;
  }, []);

  return (
    <View style={styles.starRating}>
      <StarRating rating={point} onChange={onChangePoint} starSize={scaleSize(36)} starStyle={styles.star} />
    </View>
  );
};

const useStyles = getStylesHook({
  starRating: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  star: {
    marginRight: 16,
  },
});

export default withMemo(StarVote);
