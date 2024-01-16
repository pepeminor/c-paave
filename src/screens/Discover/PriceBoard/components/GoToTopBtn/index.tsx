import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import withMemo from 'HOC/withMemo';
import { useStyles } from './styles';
import Icon from 'components/Icon';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';

type Props = {
  flatListRef: React.RefObject<FlatList>;
};

const GoToTopBtn = ({ flatListRef }: Props) => {
  const { styles, dynamicColors } = useStyles();

  const goToTop = useCallback(() => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
      <TouchableOpacity onPress={goToTop} style={styles.container}>
        <Icon name="arrow-up" color={dynamicColors.WHITE} size={16} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default withMemo(GoToTopBtn);
