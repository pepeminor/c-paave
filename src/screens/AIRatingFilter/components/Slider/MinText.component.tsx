import React, { forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';

export type MinTextRef = {
  setValue: (value: number) => void;
};

const MinText = forwardRef<MinTextRef>((_, ref) => {
  const { styles } = useStyles();
  const [value, setValue] = React.useState(0);

  useImperativeHandle(
    ref,
    () => ({
      setValue,
    }),
    []
  );

  return (
    <Text allowFontScaling={false} style={styles.maxMinText}>
      {value}
    </Text>
  );
});

export default withMemo(MinText);
