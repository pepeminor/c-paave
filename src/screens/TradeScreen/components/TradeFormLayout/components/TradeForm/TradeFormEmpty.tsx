import React from 'react';
import { View } from 'react-native';
import useStyles from './TradeForm.style';
import withMemo from 'HOC/withMemo';
import globalStyles from 'styles';

const TradeFormEmpty = () => {
  const { styles } = useStyles();
  return (
    <View style={styles.rightArea}>
      <View style={styles.screenOption}>
        <View style={styles.screenOptionPlaceHolder} />
      </View>

      <View style={styles.typeFormPlaceHolderContainer} />
      <View style={styles.typeFormPlaceHolderContainer} />

      <View style={styles.marginBottomn}>
        <View>
          <View style={styles.typeFormPlaceHolderContainer2} />
        </View>
        <View style={styles.rateContainerPlaceHolder}>
          <View style={styles.rateThemeIconPlaceHolderContainer}>
            <View>
              <View style={globalStyles.container2} />
            </View>
          </View>
          <View style={styles.width5} />
          <View style={styles.rateThemeIconPlaceHolderContainer}>
            <View>
              <View style={globalStyles.container2} />
            </View>
          </View>
          <View style={styles.width5} />
          <View style={styles.rateThemeIconPlaceHolderContainer}>
            <View>
              <View style={globalStyles.container2} />
            </View>
          </View>
          <View style={styles.width5} />
          <View style={styles.rateThemeIconPlaceHolderContainer}>
            <View>
              <View style={globalStyles.container2} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.formInfo}>
        <View>
          <View style={styles.labelPlaceHolderContainer} />
        </View>
        <View style={styles.formItem}>
          <View>
            <View style={styles.labelPlaceHolderContainer} />
          </View>
        </View>
      </View>
      <View style={styles.formInfo}>
        <View>
          <View style={styles.labelPlaceHolderContainer} />
        </View>
        <View style={styles.formItem}>
          <View>
            <View style={styles.labelPlaceHolderContainer} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default withMemo(TradeFormEmpty);
