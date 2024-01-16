import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import TickLanguage from 'assets/icon/TickLanguage.svg';
import { ILanguageOption, languageList } from 'global';
import { changeLanguage } from 'reduxs/Localization';
import { IState } from 'reduxs/global-reducers';
import { scaleSize } from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { OneSignalUtils } from 'utils';

const LanguagePicker = (props: StackScreenProps<'LanguagePicker'>) => {
  const { styles } = useStyles();

  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state: IState) => state.lang);

  const goBack = () => {
    props.navigation.goBack();
  };

  const onSelectLanguage = useCallback(
    (item: ILanguageOption) => () => {
      dispatch(changeLanguage(item.value));
      OneSignalUtils.updateLanguage(item.value);
    },
    [changeLanguage]
  );

  const lang = languageList.find(l => l.value === selectedLanguage);

  return (
    <>
      <View style={styles.container}>
        <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Language'} />
        {languageList.map((item, index) => {
          return (
            <TouchableOpacity
              // tslint:disable-next-line: jsx-no-lambda
              onPress={onSelectLanguage(item)}
              key={index}
              style={styles.itemContainer}
            >
              {lang?.value === item.value && (
                <TickLanguage height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight8} />
              )}
              <View style={styles.labelContainer}>
                <Text allowFontScaling={false} style={styles.languageLabel}>
                  {item.label}
                </Text>
              </View>
              <View style={styles.languageFlag}>{item.image}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default memo(LanguagePicker);
