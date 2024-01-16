import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useAppSelector } from 'hooks';
import HeaderScreen from 'components/HeaderScreen';
import AlreadyLogin from './AlreadyLogin';
import NonLogin from './NonLogin';
import { ACCOUNT_TYPE } from 'global';
import useStyles from './styles';
import { LEADER_BOARD_ACCOUNT_SELECTOR } from 'reduxs/actions';
import { useDispatch } from 'react-redux';

const UserInfo = (props: StackScreenProps<'UserInfo'>) => {
  const dispatch = useDispatch();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const { styles } = useStyles();

  useEffect(() => {
    dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: selectedAccountType });
  }, [selectedAccountType]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Account'}
        subAccountVisible={true}
      />
      {selectedAccountType !== ACCOUNT_TYPE.DEMO ? <AlreadyLogin /> : <NonLogin />}
    </View>
  );
};

export default memo(UserInfo);
