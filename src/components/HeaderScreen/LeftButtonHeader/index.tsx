import React, { ReactElement } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import BackIcon from 'assets/icon/BackIcon.svg';
import BackIconLogin from 'assets/icon/IconBack.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';

type ILeftButtonheaderBaseProps = {
  leftButtonIcon?: ReactElement | boolean; //ReactElement is custom, true is backButton, false | undefined is nothing
  whiteSpaceIfNull: boolean;
  background?: boolean;
  goBackAction?(): void; //if back buton is visible, fill this props
};

const LeftButtonheader = (props: ILeftButtonheaderBaseProps) => {
  const { styles } = useStyles();

  if (props.leftButtonIcon === true) {
    return (
      <TouchableOpacity
        onPress={props.goBackAction}
        style={[
          globalStyles.justifyCenter,
          Platform.OS === 'ios' ? styles.headerHeightIOS : styles.headerHeightAndroid,
        ]}
      >
        {!props.background ? (
          <BackIcon height={scaleSize(24)} width={scaleSize(24)} />
        ) : (
          <BackIconLogin height={scaleSize(24)} width={scaleSize(24)} />
        )}
      </TouchableOpacity>
    );
  } else if (props.leftButtonIcon === false || props.leftButtonIcon == null) {
    return props.whiteSpaceIfNull === true ? <View style={styles.blankSpace} /> : null;
  } else {
    return props.leftButtonIcon;
  }
};

export default withMemo(LeftButtonheader);
