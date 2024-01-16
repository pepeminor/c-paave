import React from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';

import useStyles from './styles';
import ImagesLogo from 'components/ImagesLogo';

interface IProps {}

const SymbolTagging = (_props: IProps) => {
  // eslint-disable-next-line no-empty-pattern
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <ImagesLogo codeLogo={'FPT'} logoSize={34} logoStyle={styles.logoCode} />
    </View>
  );
};

export default withMemo(SymbolTagging);
